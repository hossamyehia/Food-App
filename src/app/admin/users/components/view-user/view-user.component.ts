import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  BaseUrl = "https://upskilling-egypt.com:3006/";
  dummyImage = ".../../../../../assets/images/group.png";

  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
