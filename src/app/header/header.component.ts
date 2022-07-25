import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.onFetchData()
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
    this.dataStorageService.fetchRecipes().subscribe()

  }
}
