import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipes } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipes[]>{
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipes[] | Observable<Recipes[]> | Promise<Recipes[]> {
    const recipes = this.recipeService.getRecipes()
    if (_.isEmpty(recipes)) {
      return this.dataStorageService.fetchRecipes()
    } else {
      return recipes;
    }
  }
}