import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const shoppinglistRoutes: Routes = [
  { path: '', component: ShoppingListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(shoppinglistRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class ShoppinglistRoutingModule { }
