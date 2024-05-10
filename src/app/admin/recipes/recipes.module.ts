import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';


@NgModule({
  declarations: [
    RecipesComponent,
    ViewRecipeComponent,
    AddEditRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
