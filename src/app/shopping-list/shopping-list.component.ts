import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppinglistService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangedSub!: Subscription;
  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients()
    this.igChangedSub = this.shoppinglistService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }
  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe()
  }
  onEditItem(i: number) {
    this.shoppinglistService.startedEditing.next(i)
  }
}
