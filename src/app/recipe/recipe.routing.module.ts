import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipe-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe.component';

const recipeRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RecipeComponent,
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      { path: ":id", component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipesResolverService] },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class RecipeRoutingModule { }
