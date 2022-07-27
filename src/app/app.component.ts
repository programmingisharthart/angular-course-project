import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    this.authService.autologin()
    // console.log();

  }
  // openLink: string = 'recipe'
  // openThisLink(e: string) {
  //   console.log(e);
  //   this.openLink = e
  // }
}
