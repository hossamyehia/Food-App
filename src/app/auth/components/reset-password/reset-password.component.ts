import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  formData!: FormGroup;

  constructor(private _authService: AuthService) {

  }

  ngOnInit(): void {
    const passwordValidators = [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)];

    this.formData = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)]),
      seed: new FormControl("", [Validators.required]),
      password: new FormControl("", passwordValidators),
      confirmPassword: new FormControl("", passwordValidators)
    })
  }

  onSubmit() {
    this._authService.login(this.formData.value).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
