import { Routes,RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShowUsersComponent } from './components/showusers/showusers.component';
import { NgModule } from '@angular/core';
import { authGuard } from './auth.guard';


export const routes: Routes = [
  
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'usersData', component:ShowUsersComponent},
    // {path: 'usersData', component: ShowUsersComponent, canActivate: [authGuard] },
    {path:'**',redirectTo:'register',pathMatch:'full'}
];

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
export class AppRoutingModule{}

