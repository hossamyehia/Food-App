import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  constructor(private _httpClient: HttpClient) { }

  getFavoriteRecipes() {
    return this._httpClient.get("userRecipe");
  }

  addFavorite(id: number) {
    return this._httpClient.post("userRecipe", { recipeId: id });
  }

  deleteFavorite(id: number){
    return this._httpClient.delete(`userRecipe/${id}`);
  }
}
