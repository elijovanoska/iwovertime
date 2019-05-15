import { Component, OnInit, Input } from "@angular/core";
import { PersonalData } from "../../models/personalData.model";
import { ProfileService } from "../../services/profile.service";
import { Response } from "@angular/http";


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @Input() model: PersonalData = new PersonalData();

  constructor(private profService: ProfileService) {}

  myProfile: PersonalData;
  ngOnInit() {
    var loginUser = JSON.parse(localStorage.getItem("user"));
   console.log("login user")
   console.log(loginUser)
   this.model.email = loginUser.email;
   this.model.userUID = loginUser.uid;

    const profileObservable = this.profService.getProfile(loginUser.uid);
    profileObservable.subscribe((profileData: PersonalData) => {
      console.log("dsjcndsjkcnkdc");
      console.log(profileData);
      if (profileData) {
        this.model.address = profileData.address;
        this.model.firstname = profileData.firstname;
        this.model.lastname = profileData.lastname;
        this.model.phone = profileData.phone;
        this.model.role = profileData.role;
        this.model.email = profileData.email;

        localStorage.setItem("firstname",profileData.firstname)
        localStorage.setItem("lastname",profileData.lastname)
        localStorage.setItem("role",profileData.role)
      }
    });
  }

  updateProfile(model: PersonalData) {
    var profile = model;
    this.profService.addProfile(profile);
  }
}
