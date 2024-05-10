import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TokenService } from 'src/app/core/services/token/token.service';
import { ToasterService } from '../../toaster/service/toaster.service';
import { ChangePasswordComponent } from '../../../admin/users/components/change-password/change-password.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/admin/users/components/profile/profile.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  UserName: string = "";
  userData!:any;
  imgUrl: string = "";
  BaseUrl = "https://upskilling-egypt.com:3006/"

  constructor(
    private _tokenService: TokenService,
    private _authservice: AuthService,
    private _toasterService: ToasterService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.UserName = this._tokenService.getName();
    this.getImageUrl()
  }

  getImageUrl() {
    this._authservice.getCurrentUser().subscribe({
      next: (res: any) => {
        this.userData = res;
        this.imgUrl = this.BaseUrl + res.imagePath;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false)
      }
    })
  }

  profileDialog() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      data: this.userData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } 
    });
  }


  changePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
  }

  

  onclick(){
    let elms = document.querySelector(".cdk-overlay-container");
    console.log(elms?.innerHTML);
  }


  logout() {
    this._tokenService.logout()
  }


}
