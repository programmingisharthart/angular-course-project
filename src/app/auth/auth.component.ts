import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponses } from './auth.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup
  isLoginMode = true
  isLoading = false
  error = null
  private closeAlertSub!: Subscription;
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
  constructor(
    private authService: AuthService,
    private router: Router,
    // private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // this.loginForm = new FormGroup(null)
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })

  }
  get email() { return this.loginForm.get('email'); }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }
  onHandleError() {
    this.error = null
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value
    this.isLoading = true
    let authObs: Observable<AuthResponses>
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }
    authObs.subscribe(
      res => {
        console.log(res);
        this.isLoading = false
        this.router.navigate(['/recipe'])
      },
      err => {
        console.log(err);
        this.error = err
        this.isLoading = false
        this.showErrorAlert(err)
      });
    this.loginForm.reset()
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent() don't do this
    //let alertCpmFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear();

    const alertRef = hostViewContainerRef.createComponent(AlertComponent)
    alertRef.instance.message = message;
    this.closeAlertSub = alertRef.instance.close.subscribe(() => {
      this.closeAlertSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }
  ngOnDestroy(): void {
    if (this.closeAlertSub) {
      this.closeAlertSub.unsubscribe()
    }
  }
}