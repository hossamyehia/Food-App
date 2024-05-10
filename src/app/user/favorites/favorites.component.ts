import { Component } from '@angular/core';
import { UserRecipeService } from '../services/user-recipe.service';
import { CategoryService } from 'src/app/admin/categories/service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewRecipeComponent } from 'src/app/admin/recipes/components/view-recipe/view-recipe.component';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ToasterService } from 'src/app/shared/toaster/service/toaster.service';
import Table from 'src/app/shared/table/model/table.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {


  pageNumber = 1;
  pageSize = 10;
  totalSize!: number;
  recipeData: any = {};
  BaseUrl = "https://upskilling-egypt.com:3006/";
  dummyImage = "../../../assets/images/recipe.png";
  page: any[] = [];

  // table: Table = {
  //   headers: {
  //     "recipe.name": "Name",
  //     "recipe.price": "Price",
  //     "recipe.description": "Description",
  //   },
  //   data: [],
  //   operators: {
  //     canView: true,
  //     canDelete: true,
  //     canFavorite: false,
  //     canEdit: false
  //   },
  //   images: [
  //     {
  //       key: "recipeImage",
  //       header: "Recipe Image",
  //       dummyPath: this.dummyImage
  //     }
  //   ],
  //   arrOfObj: [{
  //     key: "category",
  //     header: "Categories",
  //     propertyKey: "name"
  //   }],
  //   objs: [{
  //     key: "tag",
  //     header: "Tag",
  //     propertyKey: "name"
  //   }]
  // }


  constructor(private _userRecipeService: UserRecipeService, private _toasterService: ToasterService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this._userRecipeService.getFavoriteRecipes().subscribe({
      next: (res: any) => {
        this.recipeData = res;
        this.totalSize = res.totalNumberOfRecords;
        this.paginate();
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      }
    })
  }

  viewRecipe(data: any): void {
    const dialogRef = this.dialog.open(ViewRecipeComponent, {
      data: data,
    });
  }

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeFavorite(result);
      }
    });
  }

  removeFavorite(id: number) {
    this._userRecipeService.deleteFavorite(id).subscribe({
      next: (res) => {
        if (res) this._toasterService.msgStart("Removed From Favorite", true);
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      },
      complete: () => {
        this.getRecipes();
      }
    })
  }

  paginate() {
    let startIndex = (this.pageNumber - 1) * this.pageSize;
    let endIndex = Math.min(startIndex + this.pageSize, this.totalSize);

    this.page = this.recipeData.data.slice(startIndex, endIndex);
    // this.table.data = this.page;
  }

  changePage(e: any) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.paginate()
  }

}
