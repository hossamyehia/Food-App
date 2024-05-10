import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { userGuard } from '../core/Guards/user/user.guard';
import { adminGuard } from '../core/Guards/admin/admin.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    {path: "home", component: HomeComponent},
    { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule), canActivate: [userGuard]},
    { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule), canActivate: [adminGuard] },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
