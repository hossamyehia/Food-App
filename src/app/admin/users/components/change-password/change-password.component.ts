import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/admin/users/services/users.service';
import { ToasterService } from '../../../../shared/toaster/service/toaster.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  formData!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _usersService: UsersService,
    private _toasterService: ToasterService,
  ) { }

  ngOnInit(): void {
    let passwordValidators = [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)];

    this.formData = new FormGroup({
      oldPassword: new FormControl(null, passwordValidators),
      newPassword: new FormControl(null, passwordValidators),
      confirmNewPassword: new FormControl(null, passwordValidators),
    })
  }

  onChangePassword() {
    console.log(this.formData.valid)

    this._usersService.changePassword(this.formData.value).subscribe({
      next: (res: any) => {
        this._toasterService.msgStart("Password Changed Successfully", true);
        this.dialogRef.close();
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      }
    })
  }

  toggleReveal(input: Element, icon: Element) {
    if (input.getAttribute("type") === "password") input.setAttribute("type", "text");
    else input.setAttribute("type", "password");

    icon.classList.toggle("fa-eye-slash")
    icon.classList.toggle("fa-eye")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
