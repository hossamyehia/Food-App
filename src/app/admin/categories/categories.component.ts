import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import Table from 'src/app/shared/table/model/table.model';
import { ToasterService } from 'src/app/shared/toaster/service/toaster.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  pageNumber = 1;
  pageSize = 10;
  categoryData: any  = {};


  table: Table = {
    headers: {
      name: "Name",
      creationDate: "Creation Date",
      modificationDate: "Modification Date",
    },
    data: [],
    operators: {
      canView: true,
      canEdit: true,
      canDelete: true,
      canFavorite: false
    },
    images: [],
    arrOfObj: [],
    objs: []
  }

  constructor(
    private _categoryService: CategoryService, 
    private _toasterService: ToasterService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
      this.getCategories();
  }

  getCategories(){
    this._categoryService.getCategories(this.pageSize, this.pageNumber).subscribe({
      next: (res)=>{
        this.categoryData = res;
        this.table.data = this.categoryData.data;
      },
      error: (err)=>{
        this._toasterService.msgStart(err.error.message, false);
      }
    })
  }

  onOperation(data: any) {
    if (data.operationInfo === "View") this.viewCategory(data.data);
    else if ( data.operationInfo === "Edit" ) this.openDialog(data.data.id, data.data.name);
    else if (data.operationInfo === "Delete") this.deleteDialog(data.data.id);
  }

  openDialog(id: number = 0, name: string = ""): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {id: id, name: name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.id) this.updateCategory(result.id, result.name);
        else this.addCategory(result.name);
      }
    });
  }

  viewCategory(data: any): void{
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      data: data,
    });
  }

  deleteDialog(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteCategory(result);
      }
    });
  }

  addCategory(name: string){
    this._categoryService.addCategory(name).subscribe({
      next: (res)=>{
        this._toasterService.msgStart("Added Successfully", true);
      },
      error: (err)=>{
        this._toasterService.msgStart(err.error.message, false);
      },
      complete:()=>{
        this.getCategories();
      }
    })
  }

  updateCategory(id: number, name:string){
    this._categoryService.updateCategory(id, name).subscribe({
      next: (res)=>{
        this._toasterService.msgStart("Updated Successfully", true);
      },
      error: (err)=>{
        this._toasterService.msgStart(err.error.message, false);
      },
      complete:()=>{
        this.getCategories();
      }
    })
  }

  deleteCategory(id: number){
    this._categoryService.deleteCategory(id).subscribe({
      next: (res)=>{
        this._toasterService.msgStart("Deleted Successfully", true);
      },
      error: (err)=>{
        this._toasterService.msgStart(err.error.message, false);
      },
      complete:()=>{
        this.getCategories();
      }
    })
  }

  changePage(e: any){
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getCategories();
  }
}
