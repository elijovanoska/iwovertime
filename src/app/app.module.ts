import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { HttpModule } from '@angular/http';
import { HttpClientModule  } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/auth-components/register/register.component';
import { LoginComponent } from './components/auth-components/login/login.component';
import { VerifyEmailComponent } from './components/auth-components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth-components/forgot-password/forgot-password.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard';
import { ProfileService } from './services/profile.service';
import { MatTableModule, MatSortModule } from '@angular/material';
/* import { MyovertimeComponent } from './components/myovertime/myovertime.component';
import { AddNewOvertimeComponent } from './components/myovertime/add-new-overtime/add-new-overtime.component'; */

var config = {
  apiKey: "AIzaSyDAwqBj70jDaGcbadXdK1q6bTPXxnB1y_c",
  authDomain: "overtime-project.firebaseapp.com",
  databaseURL: "https://overtime-project.firebaseio.com",
  projectId: "overtime-project",
  storageBucket: "overtime-project.appspot.com",
  messagingSenderId: "1034949860229"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent
   // MyovertimeComponent,
    //AddNewOvertimeComponent // this two no need to be here for lazy loading
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,// Only required for database features
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot()
  //  ReactiveFormsModule //this will go into the module for lazy loading
  ],
  providers: [AuthService, AuthGuard, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
