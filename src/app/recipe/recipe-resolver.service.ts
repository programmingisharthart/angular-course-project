import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipes } from "./recipe.model";

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipes[]>{
  constructor(private dataStorageService: DataStorageService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipes[] | Observable<Recipes[]> | Promise<Recipes[]> {
    return this.dataStorageService.fetchRecipes()
  }
}