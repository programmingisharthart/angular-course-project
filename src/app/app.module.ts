import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeService } from './recipe/recipe.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShopingEditComponent } from './shopping-list/shoping-edit/shoping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppinglistService } from './shopping-list/shoppinglist.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShopingEditComponent,
    DropdownDirective,
    PageNotFoundComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService, ShoppinglistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
