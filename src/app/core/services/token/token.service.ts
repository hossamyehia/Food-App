import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(public jwtHelper: JwtHelperService, private router: Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin():boolean {
    return this.getRole() === "SuperAdmin";
  }

  public isUser():boolean{
    return this.getRole() === "SystemUser";
  }

  public setToken(data: any) {
    localStorage.setItem("token", (({ token }) => token)(data));
  }

  public tokenGetter(): string {
    return localStorage.getItem('token') || "";
  }

  public deserilizeToken(token: string): any {
    return jwtDecode(token);
  }

  public getID() {
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["userId"];
  }

  public getName() {
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["userName"];
  }

  public getRole() {
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["userGroup"];
  }

  public logout() {
    localStorage.removeItem("token");
    this.routeTologin();
  }

  public routeTologin() {
    this.router.navigate(["/auth"]);
    window.location.reload();
  }
}
