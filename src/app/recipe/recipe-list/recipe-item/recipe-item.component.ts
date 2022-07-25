import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { Recipes } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipes;
  @Input() index!: number;
  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void { }

}
