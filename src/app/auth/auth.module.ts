import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
const authRoutes: Routes = [
  { path: '', component: AuthComponent },
]
@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule { }
