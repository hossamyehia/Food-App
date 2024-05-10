import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }

  getUsers(params: any){
    return this._httpClient.get("Users", {params: params});
  }

  changePassword(data: any){
    return this._httpClient.put("Users/ChangePassword", data);
  }

  deleteUser(id: number){
    return this._httpClient.delete(`Users/${id}`);
  }
}
