import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ToasterService } from 'src/app/shared/toaster/service/toaster.service';
import { VerifyComponent } from '../verify/verify.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formData!: FormGroup;
  image!: any;

  email!: string;

  constructor(private _authService: AuthService, private _toasterService: ToasterService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    let defaultValidators = [Validators.required];
    let passwordValidators = [...defaultValidators, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)];
    let emailValidators = [...defaultValidators, Validators.email];
    let phoneNumberValidator = [...defaultValidators, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]

    this.formData = new FormGroup({
      userName: new FormControl("", defaultValidators),
      country: new FormControl("", defaultValidators),
      password: new FormControl("", passwordValidators),
      email: new FormControl("", emailValidators),
      phoneNumber: new FormControl("", phoneNumberValidator),
      confirmPassword: new FormControl("", passwordValidators),
      profileImage: new FormControl(this.image)
    })
  }

  uploadFile(event: any) {
    const files = (event.target as HTMLInputElement).files || [];
    const file = files[0];

    if (file != null) {
      this.image = file;
    }
  }

  onSubmit() {
    let data = new FormData();

    for (let key in this.formData.value) {
      if (key === "profileImage") continue;
      data.append(key, this.formData.value[key]);
    }

    if (this.image) data.append("profileImage", this.image);
    this.email = data.get("email") as string;

    this._authService.register(data).subscribe({
      next: (res: any) => {
        this._toasterService.msgStart("Register Successfully", true);
      },
      error: (err: any) => {
        this._toasterService.msgStart(err.error.message, false);
      }, 
      complete: () => {
        this.openDialog();
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: { code: null,  email:  this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result) this.verifyAccount(result)
      }else{
        this.openDialog();
      }
    });
  }

  verifyAccount(data: any) {
    this._authService.verify(data).subscribe({
      next: (res: any) => {
        this._toasterService.msgStart("Verified Successfully", true);
      },
      error: (err: any) => {
        this._toasterService.msgStart(err.error.message, false);
        this.openDialog();
      }
    })
  }

  toggleReveal(input: Element, icon: Element) {
    if (input.getAttribute("type") === "password") input.setAttribute("type", "text");
    else input.setAttribute("type", "password");

    icon.classList.toggle("fa-eye-slash")
    icon.classList.toggle("fa-eye")
  }
}
