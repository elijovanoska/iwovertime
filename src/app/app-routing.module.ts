import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegisterComponent } from './components/auth-components/register/register.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { VerifyEmailComponent } from './components/auth-components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth-components/forgot-password/forgot-password.component';
import { AuthGuard } from './services/auth/auth-guard';

const routes: Routes = [
  { path: '', component: ProfileComponent,
    data: {},
    canActivate:[AuthGuard]  
  },
  { path: 'profile', component: ProfileComponent, 
    data: {},
    canActivate:[AuthGuard] 
  },
  { path: 'myovertime', 
    loadChildren: './components/myovertime/myovertime.module#MyovertimeModule', 
    canLoad: [AuthGuard],
    data:{
      allowedRoles:['PL',"user"]
    }
  }, //lazy loading 
  { path: 'teamovertime', 
    loadChildren: './components/teamovertime/teamovertime.module#TeamovertimeModule', 
    canLoad: [AuthGuard],
    data: {
              allowedRoles: ['PL']
            }
}, //lazy loading 
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'verify-email', component: VerifyEmailComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent}
];
@NgModule({
 imports: [RouterModule.forRoot(routes)], 
 exports: [RouterModule]
})
export class AppRoutingModule { }
