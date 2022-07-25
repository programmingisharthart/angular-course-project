import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppinglistService {
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 12),
    new Ingredient("Banana", 14),
    new Ingredient("Mango", 6)
  ]
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  addIngredient(ingredients: Ingredient) {
    this.ingredients.push(ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  addArraysOfIngredients(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients]
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  getIngredients() {
    return this.ingredients.slice()
  }
  getIngredient(id: number) {
    return this.ingredients[id]
  }
  updateIngredient(index: number, value: Ingredient) {
    // console.log(this.ingredients[index]);
    this.ingredients[index] = value
    this.ingredientsChanged.next(this.ingredients.slice())

  }
  deleteIngredient(index: number) {
    // this.ingredients = _.filter(this.ingredients, (value, key) => {
    //   return key !== index
    // }) filter is good if you have a lot of list in array to be deleted
    this.ingredients.splice(index, 1) // better for performance and for removing 1 data
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}