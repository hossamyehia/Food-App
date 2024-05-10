import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  UserName: string = "";

  constructor(private _tokenService: TokenService){

  }

  ngOnInit(): void {
      this.UserName = this._tokenService.getName();
  }

  isUser(){
    this._tokenService.isUser();
  }

}
