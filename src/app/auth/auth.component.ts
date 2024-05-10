import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { TokenService } from '../core/services/token/token.service';
import { Router } from '@angular/router';
import { ToasterService } from '../shared/toaster/service/toaster.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formData!: FormGroup;

  constructor(private _authService: AuthService, private _tokenService: TokenService, private _router: Router, private _toasterService: ToasterService) {

  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)])
    })
  }

  onSubmit() {
    this._authService.login(this.formData.value).subscribe({
      next: (res: any) => {
        this._tokenService.setToken(res);
      },
      error: (err: any) => {
        this._toasterService.msgStart(err.error.message, false);
      }, complete: () => {
        this.routeToDashboard();
      }
    })
  }


  routeToDashboard() {
    this._router.navigate(["../dashboard/home"])
  }

  toggleReveal(input: Element, icon: Element) {
    if (input.getAttribute("type") === "password") input.setAttribute("type", "text");
    else input.setAttribute("type", "password");

    icon.classList.toggle("fa-eye-slash")
    icon.classList.toggle("fa-eye")
  }
}
