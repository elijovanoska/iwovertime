import { Injectable } from '@angular/core';
import { OvertimeModel } from '../models/overtime.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'; 
import { Http } from '@angular/http'; // Firebase modules for Database, Data list and Single object
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyovertimeService {
  overtimesRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  overtimeRef: AngularFireObject<any>; 
  items: Observable<any>;  // Reference to user object, Its an Observable too 
  loginUser = JSON.parse(localStorage.getItem("user"));
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase, private http: Http) {
    this.overtimesRef = db.list('/overtime');
    
    //this.items = db.list()
   }

  addOvertime(overtime: OvertimeModel) 
  {
     
    this.db.database.ref('overtime/').push({
      firstname: overtime.firstname,
      lastname: overtime.lastname,
      project: overtime.project,
      hoursFrom: overtime.timefrom,
      hoursTo: overtime.timeto,
      date: overtime.date,
      comment: overtime.comment,
      totalTime: overtime.totalTime,
      userUID: this.loginUser.uid
    });
  } 

 
  public getMyOvertimeList(userUID: string): any {
    const profileObservable = new Observable(observer => {
      var rootRef = this.db.database.ref();
      var usersRef = rootRef.child("overtime");
      usersRef.orderByChild("userUID").equalTo(userUID).on("child_added", function(snapshot) {
       observer.next(snapshot.val())          
       });
           
    });

    return profileObservable;
}
  public getAllOvertimeList(): any {
    const profileObservable = new Observable(observer => {
      var rootRef = this.db.database.ref();
      var usersRef = rootRef.child("overtime");
      usersRef.orderByChild("userUID").on("child_added", function(snapshot) {
       observer.next(snapshot.val())          
       });
           
    });

    return profileObservable;
}

}
