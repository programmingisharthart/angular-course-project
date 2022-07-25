import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipes } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipes[] = [];
  recipeSubscription!: Subscription
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    this.recipeSubscription = this.recipeService.recipesChange.subscribe((recipe: Recipes[]) => {
      this.recipes = recipe
    })
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe()
  }
}
