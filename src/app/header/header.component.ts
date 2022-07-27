import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipe/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) { }
  // user!: User;
  isAuthenticated = false
  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user // !user ? false : true 
    })
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
  // @Output() OpenLink = new EventEmitter<string>();
  //
  // onSelect(selected: string) {
  //   this.OpenLink.emit(selected)
  // }
  onSaveData() {
    this.dataStorageService.storeRecipes()
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      res => {
        console.log(res);

      }
    )

  }
  onLogout() {
    this.authService.logout()
  }
}
