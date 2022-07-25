import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { map, tap } from 'rxjs';
import { Recipes } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) { }
  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.http.put('https://ng-course-recipe-a5d32-default-rtdb.firebaseio.com/recipe.json', recipes)
      .subscribe(
        res => {
          console.log(res);
        }
      )
  }
  fetchRecipes() {
    return this.http.get<Recipes[]>('https://ng-course-recipe-a5d32-default-rtdb.firebaseio.com/recipe.json')
      .pipe(map((recipes: Recipes[]) => {
        return _.map(recipes, (value, key) => {
          return {
            ...value,
            ingredients: value?.ingredients || []
          }
        })
        // return recipes.map(
        //   recipe => {
        //     return {
        //       ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
        //     }
        //   }
        // )
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes)
      }))
  }
}