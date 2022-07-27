import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './recipe/recipe.service';
import { ShoppinglistService } from './shopping-list/shoppinglist.service';


@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    RecipeService,
    ShoppinglistService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    }
  ],
})
export class CoreModule { }
