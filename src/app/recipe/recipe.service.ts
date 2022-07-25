import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppinglistService } from "../shopping-list/shoppinglist.service";
import { Recipes } from "./recipe.model";

@Injectable()
export class RecipeService {
  constructor(private slservice: ShoppinglistService) { }
  private recipes: Recipes[] = [];
  recipesChange = new Subject<Recipes[]>();
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    // return _.find(this.recipes, (value, index) => {
    //   return index === id
    // })
    return this.recipes[id]
  }
  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.slservice.addArraysOfIngredients(ingredient)
  }
  addRecipe(recipe: Recipes) {
    this.recipes.push(recipe)
    this.recipesChange.next(this.recipes.slice())
  }
  setRecipes(recipes: Recipes[]) {
    this.recipes = recipes
    this.recipesChange.next(this.recipes.slice())
  }
  updateRecipe(index: number, newRecipe: Recipes) {
    this.recipes[index] = newRecipe
    this.recipesChange.next(this.recipes.slice())
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChange.next(this.recipes.slice())
  }
}