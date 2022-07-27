import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponses } from "./auth.model";
import { User } from "./user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any
  constructor(private http: HttpClient, private router: Router) {

  }
  firebaseApiKey: string = environment.firebaseApiKey;
  baseUrl: string = environment.firebaseUrl;
  signUp(email: string, password: string) {
    return this.http.post<AuthResponses>(`${this.baseUrl}/v1/accounts:signUp?key=${this.firebaseApiKey}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      console.log(resData.idToken);

      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponses>(`${this.baseUrl}/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }

  autologin() {
    // console.log("this ==== ", JSON.parse(localStorage.getItem('userData') || ""));
    console.log(_.isEmpty(localStorage.getItem('userData')) ? null : JSON.parse(localStorage.getItem('userData') || ''));

    const userData: { email: string; id: string; _token: string, _tokenExpirationDate: string } = _.isEmpty(localStorage.getItem('userData')) ? null : JSON.parse(localStorage.getItem('userData') || '')
    console.log(userData);

    if (!userData) {

      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if (loadedUser.token) {
      console.log(new Date(userData._tokenExpirationDate));

      this.userSubject.next(loadedUser)
      const expirationDuration =
        +new Date(userData._tokenExpirationDate).getTime() -
        +new Date().getTime();

      // this.autoLogout(expirationDuration) // aDD THIS IF YOU WANT TO AUTOLOGOUT
    }
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  logout() {
    localStorage.removeItem('userData')
    this.userSubject.next(null)
    this.router.navigate(['/auth'])
    if (this.tokenExpirationTimer) [
      clearTimeout(this.tokenExpirationTimer)
    ]
    this.tokenExpirationTimer = null
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'this password is not correct'
        break;
    }
    return throwError(errorMessage)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn)
    const user = new User(email, userId, token, expirationDate)
    this.userSubject.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
}