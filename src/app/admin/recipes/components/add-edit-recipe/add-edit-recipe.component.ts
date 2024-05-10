import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/admin/categories/service/category.service';
import { ToasterService } from 'src/app/shared/toaster/service/toaster.service';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent {

  formData!: FormGroup;

  id!: number;
  image!: any;
  BaseUrl = "https://upskilling-egypt.com:3006/"

  data: { [key: string]: any } = {
    name: "",
    description: "",
    price: null,
    tagId: null,
    categoriesIds: [],
    recipeImage: null,
  }

  tagsData!: any;
  CategoriesData!: any;

  constructor(
    private _recipeService: RecipeService, 
    private _categoryService: CategoryService, 
    private _route: ActivatedRoute,
    private _toasterService : ToasterService, 
    private _router: Router) {
  }

  ngOnInit(): void {
    let defaultValidators = [Validators.required];

    this._route.queryParams
      .subscribe((params: any) => {
        this.id = params.id;

      })

    if (this.id) {
      this.getRecipeData();
    }

    this.formData = new FormGroup({
      name: new FormControl(this.data['name'], defaultValidators),
      description: new FormControl(this.data['description'], defaultValidators),
      price: new FormControl(this.data['price'], defaultValidators),
      tagId: new FormControl(this.data['tagId'], defaultValidators),
      categoriesIds: new FormControl(this.data['categoriesIds'], defaultValidators),
      recipeImage: new FormControl(this.data['recipeImage'], defaultValidators),
    })
    this.getLookUps();
  }

  getRecipeData() {
    this._recipeService.getRecipeByID(this.id).subscribe({
      next: (res: any) => {
        this.data = res;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      },
      complete: async () => {
        let image: any;
        if( this.data['imagePath']) image = this.fetchImage(this.BaseUrl + this.data['imagePath']);
        //if( this.data['imagePath']) this.image = this.BaseUrl + this.data['imagePath'];
        this.formData.patchValue(
          (({ tag, category, imagePath, ...rest }) => {
            let arr = [];
            for (let item of category) {
              arr.push(item.id);
            }
            return { ...rest, tagId: tag.id, recipeImage: this.BaseUrl + imagePath, categoriesIds: arr }
          })(this.data)
        )
      }
    })
  }

  onSubmit() {
    let data = new FormData();

    for (let key in this.formData.value) {
      if (key === "recipeImage") continue;
      data.append(key, this.formData.value[key]);
    }

    if (this.image) data.append("recipeImage", this.image);

    if (!this.id) this.addRecipe(data);
    else this.updaterecipe(this.id, data);
  }

  async fetchImage(url: string) {
    var res = await fetch(url);
    var blob = await res.blob();
    
    this.image = blob;

    // const result = await new Promise((resolve, reject) => {
    //   var reader = new FileReader();
    //   reader.addEventListener("load", function () {
    //     resolve(reader.result);
    //   }, false);

    //   reader.onerror = () => {
    //     return reject(this);
    //   };
    //   reader.readAsDataURL(blob);
    // })

    return blob;
  };
  /*
  async fetchImage(){
    let image = await fetch(this.BaseUrl + this.data['imagePath']);
    let blob = await image.blob();
    this.image = blob;
  }
  */

  addRecipe(data: any) {
    this._recipeService.addRecipe(data).subscribe({
      next: (res) => {
        this._toasterService.msgStart("Added Successfully", true);
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      }
    })
  }

  updaterecipe(id: number, newData: any) {
    this._recipeService.updateRecipe(id, newData).subscribe({
      next: (res) => {
        this._toasterService.msgStart("Updated Successfully", true);
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      }
    })
  }

  onSelect(event: any) {
    this.image = event.addedFiles[0];
  }

  onRemove(event: any) {
    this.image = null;
  }

  getLookUps() {
    this._recipeService.getTags().subscribe({
      next: (res: any) => {
        this.tagsData = res;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      }
    })

    this._categoryService.getCategories(1000000, 1).subscribe({
      next: (res: any) => {
        this.CategoriesData = res.data;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      }
    })
  }

  resetAll() {
    this.image = null;
    this._router.navigate([], {
      queryParams: {
        'id': null
      },
      queryParamsHandling: 'merge'
    })
  }


}
