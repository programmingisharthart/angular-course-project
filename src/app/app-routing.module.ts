import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const AppRoutes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(module => module.RecipeModule) },
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppinglistModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) }
  // { path: 'not-found', component: PageNotFoundComponent },
  // { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}