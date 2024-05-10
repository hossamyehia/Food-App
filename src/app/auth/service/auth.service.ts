import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ILogin from '../models/ILogin.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public role!: string;

  constructor(private _httpClient: HttpClient) { }

  login(data: ILogin){
    return this._httpClient.post("Users/Login", data);
  }

  getCurrentUser(){
    return this._httpClient.get(`Users/currentUser`);
  }

  register( data : FormData){
    return this._httpClient.post("Users/Register", data);
  }

  verify(data: any){
    return this._httpClient.put("Users/verify", data);
  }

  requestReset( data: any){
    return this._httpClient.post("Users/Reset/Request", data);
  }

  resetPassword(data: any){
    return this._httpClient.post("Users/Reset", data);
  }

}
