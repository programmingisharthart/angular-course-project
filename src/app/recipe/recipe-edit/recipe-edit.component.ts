import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { ShoppinglistService } from 'src/app/shopping-list/shoppinglist.service';
import { Recipes } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private shoppingList: ShoppinglistService,
    private router: Router
  ) { }
  id!: number;
  editMode = false;
  igChangedSub!: Subscription;
  recipe!: Recipes;
  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        // this.recipe = this.recipeService.getRecipe(this.id)
        this.initForm()
      }
    )

  }

  get ingredientsData() { return <FormArray>this.recipeForm.get('ingredients'); }
  private initForm() {
    let recipeName = '';
    let recipeDescription = ''
    let recipeImagePath = ''
    let recipeIngredients = new FormArray(new Array)
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeDescription = recipe.description
      recipeImagePath = recipe.imagePath
      if (!_.isEmpty(recipe.ingredients)) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
        // _.forEach(recipe.ingredients, (value, key) => {
        //   recipeIngredients.push
        // })
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    })


  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }
  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  onSubmit() {
    // const { name, description, imagePath, ingredients } = this.recipeForm.value
    // const newRecipe = new Recipes(name, description, imagePath, ingredients)
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, newRecipe)
    // } else {
    //   this.recipeService.addRecipe(newRecipe)
    // } long method

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    } //short method 
    this.onCancel()
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
