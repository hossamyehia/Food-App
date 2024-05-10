import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  getCategories(pageSize: number, pageNumber: number){
    return this._httpClient.get("Category", {params: {pageSize, pageNumber}})
  }

  addCategory(name: string){
    return this._httpClient.post("Category", {name})
  }

  updateCategory(id: number, name: string){
    return this._httpClient.put(`Category/${id}`, {name});
  }

  deleteCategory(id: number){
    return this._httpClient.delete(`Category/${id}`);
  }
}
