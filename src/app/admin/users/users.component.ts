import { Component } from '@angular/core';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UsersService } from './services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'src/app/shared/toaster/service/toaster.service';
import Table from 'src/app/shared/table/model/table.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  
  pageNumber = 1;
  pageSize = 10;
  userData: any = {};
  dummyImage = "assets/images/group.png";

  searchValue: string = "";
  searchBy: string = "";
  groups: number[] = [];

  table: Table = {
    headers: {
      userName: "Name",
      email: "Email",
      country: "Country",
      phoneNumber: "Phone Number",
    },
    data: [],
    operators: {
      canView: true,
      canDelete: true,
      canFavorite: false,
      canEdit: false
    },
    images: [
      {
        key: "imagePath",
        header: "Image",
        dummyPath: this.dummyImage
      }
    ],
    arrOfObj: [],
    objs: [{
      key: "group",
      header: "Group",
      propertyKey: "name"
    }]
  }

  constructor(
    private _usersService: UsersService, 
    private _toasterService: ToasterService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    let data = {
      [this.searchBy]: this.searchValue,
      groups: this.groups,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    }

    this._usersService.getUsers(data).subscribe({
      next: (res: any) => {
        this.userData = res;
        this.table.data = res.data;
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      }
    })
  }

  onOperation(data: any) {
    if (data.operationInfo === "View") this.viewUser(data.data);
    else if (data.operationInfo === "Delete") this.deleteDialog(data.data.id);
  }

  viewUser(data: any): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: data,
    });
  }

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteUser(result);
      }
    });
  }
  
  deleteUser(id: number) {
    this._usersService.deleteUser(id).subscribe({
      next: (res) => {
        this._toasterService.msgStart("Deleted Successfully", true);
      },
      error: (err) => {
        this._toasterService.msgStart(err.error.message, false);
      },
      complete: () => {
        this.getUsers();
      }
    })
  }

  resetSearch(){
    this.searchValue= "";
    this.getUsers();
  }


  changePage(e: any) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getUsers();
  }
}
