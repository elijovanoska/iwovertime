import { Injectable } from '@angular/core';
import { PersonalData } from '../models/personalData.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'; 
import { Http } from '@angular/http'; // Firebase modules for Database, Data list and Single object
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profilesRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  profileRef: AngularFireObject<any>; 
  items: Observable<any>;  // Reference to user object, Its an Observable too 
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase, private http: Http) {
    this.profilesRef = db.list('/profile');
    //this.items = db.list()
   }

  addProfile(profile: PersonalData) 
  {
     /*  this.profilesRef.push({
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      userUID: profile.userUID,
      role: profile.role
    }); */
    this.db.database.ref('profile/').push({
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      userUID: profile.userUID,
      role: profile.role
    });
  } 

 
  public getProfile(userUID: string): any {
    const profileObservable = new Observable(observer => {
      var rootRef = this.db.database.ref();
      var usersRef = rootRef.child("profile");
      usersRef.orderByChild("userUID").equalTo(userUID).on("child_added", function(snapshot) {
       observer.next(snapshot.val())          
       });
           
    });

    return profileObservable;
}

}
