import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppinglistService } from '../shoppinglist.service';
@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.scss']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  constructor(private shoppinglistService: ShoppinglistService) { }
  // newIngredient!: Ingredient;
  editingSubcription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  ngOnInit(): void {
    this.editingSubcription = this.shoppinglistService.startedEditing.subscribe((i: number) => {
      this.editedItemIndex = i
      this.editMode = true;
      this.editedItem = this.shoppinglistService.getIngredient(i)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })


  }
  ngOnDestroy(): void {
    this.editingSubcription.unsubscribe()
  }
  // addShoppingList(e: Event) {
  //   e.preventDefault()
  //   const ingName = this.nameReference.nativeElement.value;
  //   const ingAmount = Number(this.amountReference.nativeElement.value);
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.shoppinglistService.addIngredient(newIngredient)
  // }
  onSubmit(f: NgForm) {
    let newIngredient = new Ingredient(f.value.name, f.value.amount)
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient)
      this.editMode = false
      // console.log(newIngredient);
    } else {
      this.shoppinglistService.addIngredient(newIngredient)
    }
    f.reset()
  }
  onDelete() {
    this.shoppinglistService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
  onClear() {
    this.slForm.reset()
    this.editMode = false
  }


}
