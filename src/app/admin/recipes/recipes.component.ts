import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeService } from './services/recipe.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { CategoryService } from '../categories/service/category.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserRecipeService } from 'src/app/user/services/user-recipe.service';
import Table from 'src/app/shared/table/model/table.model';
import { ToasterService } from 'src/app/shared/toaster/service/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {

  pageNumber = 1;
  pageSize = 10;
  recipeData: any = {};
  BaseUrl = "https://upskilling-egypt.com:3006/";
  dummyImage = "../../../assets/images/recipe.png";

  name: string = "";
  tagId: number = 0;
  categoryId: number = 0;

  tagsData!: any;
  CategoriesData!: any;

  table: Table = {
    headers: {
      name: "Name",
      price: "Price",
      description: "Description",
    },
    data: [],
    operators: {
      canView: true,
      canDelete: this.isAdmin(),
      canFavorite: this.isUser(),
      canEdit: this.isAdmin()
    },
    images: [
      {
        key: "imagePath",
        header: "Recipe Image",
        dummyPath: this.dummyImage
      }
    ],
    arrOfObj: [{
      key: "category",
      header: "Categories",
      propertyKey: "name"
    }],
    objs: [{
      key: "tag",
      header: "Tag",
      propertyKey: "name"
    }]
  }

  constructor(
    private _recipeService: RecipeService, 
    private _categoryService: CategoryService, 
    private _userRecipeService: UserRecipeService, 
    private _tokenService: TokenService, 
    private _toasterService: ToasterService, 
    private _route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getLookUps();
    this.getRecipes();
  }

  getRecipes() {
    let data = {
      name: this.name,
      tagId: this.tagId,
      categoryId: this.categoryId,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    }

    this._recipeService.getRecipes(data).subscribe({
      next: (res) => {
        this.recipeData = res;
        this.table.data = this.recipeData.data;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false)
      }
    })
  }

  onOperation(data: any) {
    if (data.operationInfo === "View") this.viewRecipe(data.data);
    else if (data.operationInfo === "Edit") this.onEdit(data.data.id);
    else if (data.operationInfo === "Favorite") this.addToFav(data.data.id);
    else if (data.operationInfo === "Delete") this.deleteDialog(data.data.id);
  }

  viewRecipe(data: any): void {
    const dialogRef = this.dialog.open(ViewRecipeComponent, {
      data: data,
    });
  }

  onEdit(id: number){
    this._router.navigate(
      ['./addedit'],
      { queryParams: { id: id } ,relativeTo: this._route },
    );
  }

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleterecipe(result);
      }
    });
  }

  deleterecipe(id: number) {
    this._recipeService.deleteRecipe(id).subscribe({
      next: (res) => {
        this._toasterService.msgStart("Deleted Succesfully", true);
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      },
      complete: () => {
        this.getRecipes();
      }
    })
  }


  getLookUps() {
    this._recipeService.getTags().subscribe({
      next: (res: any) => {
        this.tagsData = res;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false)
      }
    })

    this._categoryService.getCategories(1000000, 1).subscribe({
      next: (res: any) => {
        this.CategoriesData = res.data;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false)
      }
    })
  }

  resetNameSearch() {
    this.name = "";
    this.getRecipes();
  }

  addToFav(id: number) {
    this._userRecipeService.addFavorite(id).subscribe({
      next: (res: any) => {
        this._toasterService.msgStart("Added To Favorite Succesfully", true);
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false)
      }
    })
  }

  isAdmin() {
    return this._tokenService.isAdmin();
  }

  isUser() {
    return this._tokenService.isUser();
  }

  changePage(e: any) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getRecipes();
  }

}
