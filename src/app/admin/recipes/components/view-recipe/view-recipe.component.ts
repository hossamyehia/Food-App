import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../../model/recipe.model';

interface FavData extends Recipe{
  fav: boolean;
}

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {
  BaseUrl = "https://upskilling-egypt.com:3006/";
  dummyImage = ".../../../../../assets/images/recipe.png";

  constructor(
    public dialogRef: MatDialogRef<ViewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FavData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
