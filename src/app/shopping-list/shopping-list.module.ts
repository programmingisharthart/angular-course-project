import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { ShoppinglistRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ShoppinglistRoutingModule
  ],
  exports: [],
  declarations: [
    ShoppingListComponent,
    ShopingEditComponent,
  ],
  providers: [],
})
export class ShoppinglistModule { }
