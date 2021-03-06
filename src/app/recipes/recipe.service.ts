import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  // new Recipe (
  // 'Crispy Water-Balls(Pani-Puri)',
  // 'Deliciousness Jumping Into The Mouth!',
  // tslint:disable-next-line:max-line-length
  // 'https://api.lookandcook.com/uploads/b18ea9cabab443d7a9f0bd746d6ee805.jpg ',
  // [
  //  new Ingredient('crispy balls', 10),
  // new Ingredient('potato mash', 1),
  // new Ingredient('spicy water', 2)
  // ]),
  // new Recipe (
  // 'Amazing Spicy Momos',
  // 'Tasty Momos Is What You Deserve!',
  // tslint:disable-next-line:max-line-length
  // 'https://allchickenrecipe.com/wp-content/uploads/2020/05/Chicken-Momos.jpg',
  // [
  // new Ingredient('momos', 7),
  // new Ingredient('chutney', 2)
  // ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {
  }

  // tslint:disable-next-line:typedef
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  // tslint:disable-next-line:typedef
  getRecipes() {
    return this.recipes.slice();
  }

  // tslint:disable-next-line:typedef
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
