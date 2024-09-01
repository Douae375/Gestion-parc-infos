import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { TechnicienUserComponent } from './components/technicien-user/technicien-user.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
    {path:'user-dashboard',component:HomeUserComponent,canActivate:[authGuard]},
    {path:'technicien-dashboard',component:TechnicienUserComponent,canActivate:[authGuard]}
];
