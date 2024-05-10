import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private _httpClient: HttpClient) { }

  getRecipes(params: any) {
    return this._httpClient.get("Recipe", { params: params })
  }

  getRecipeByID(id: number){
    return this._httpClient.get(`Recipe/${id}`);
  }

  getTags(){
    return this._httpClient.get("tag");
  }

  addRecipe(data: Recipe) {
    return this._httpClient.post("Recipe", data)
  }

  updateRecipe(id: number, newData: any) {
    return this._httpClient.put(`Recipe/${id}`, newData);
  }

  deleteRecipe(id: number) {
    return this._httpClient.delete(`Recipe/${id}`);
  }
}
