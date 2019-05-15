import { Router } from '@angular/router';
import { User } from 'firebase';  
import { AngularFireAuth } from  "@angular/fire/auth";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  user:  User;
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router){
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.afAuth.auth.currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(
              response => {
                this.user = response.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.afAuth.auth.currentUser.getIdToken()
                .then(
                  (token: string) => this.token = token
                )
                this.router.navigate(['profile'])
              }
            )
            .catch(
              error => console.log(error)
            )    
  }

  signinUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.user = response.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.afAuth.auth.currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          )
          this.router.navigate(['/profile']);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

   sendPasswordResetEmail(passwordResetEmail: string) {
    return  this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
 }

  logout() {
    this.afAuth.auth.signOut();
    this.token = null;
    localStorage.removeItem('user')
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('role')
    this.router.navigate(['login']);
  }

  getIdToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticatedUser() {
   // return this.token != null;
  if(this.token != null )
   {
    var loginUser = JSON.parse(localStorage.getItem("user"));
    if(loginUser.stsTokenManager.expirationTime > Date.now() && loginUser.stsTokenManager.accessToken == this.token)
     return true;
    else return false;
   }
   else return false;
   
  } 
  isAuthenticated(allowedRoles: string[]): boolean {
   // return this.token != null;
   var authenticatedUser = this.isAuthenticatedUser();
   if(authenticatedUser)
   {
    var loginUser = JSON.parse(localStorage.getItem("user"));
    var loginUserRole = localStorage.getItem("role");
    if (allowedRoles == null || allowedRoles.length === 0) return true
    else
    {
      if(allowedRoles.includes(loginUserRole)) return true 
      else return false;
    }
   }
   else
   return false;
  }
}
