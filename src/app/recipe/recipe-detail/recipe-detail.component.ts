import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppinglistService } from 'src/app/shopping-list/shoppinglist.service';
import { Recipes } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipes = new Recipes('', '', '', []);
  id: number = 0;
  // @Input() recipe!: Recipes;
  constructor(private shoppingService: ShoppinglistService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {

  }
  ngOnInit(): void {

    // this.recipe = this.recipeService.getRecipe(id)
    this.route.params.subscribe(
      (param: Params) => {
        this.id = param['id']
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  addToShoppingList() {
    // let ingredients = this.recipe?.ingredients || []
    // this.shoppingService.addArraysOfIngredients(ingredients)
    this.shoppingService.addArraysOfIngredients(this.recipe.ingredients)
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route }) // this is the same as above
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
