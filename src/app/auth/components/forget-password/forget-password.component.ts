import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  formData!: FormGroup;

  constructor(private _authService: AuthService) {

  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)])
    })
  }

  onSubmit() {
    this._authService.requestReset(this.formData.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
