import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { forbiddenNameValidator } from '../../../shared/validators/forbidden-name-validator';
import { forbiddenCharactersValidator } from '../../../shared/validators/forbidden-characters-validator';
import { Projects } from '../../../models/projects.model';
import { Router } from '@angular/router';
import { OvertimeModel } from '../../../models/overtime.model';
import { MyovertimeService } from '../../../services/myovertime.service';

@Component({
  selector: 'app-add-new-overtime',
  templateUrl: './add-new-overtime.component.html',
  styleUrls: ['./add-new-overtime.component.css']
})
export class AddNewOvertimeComponent implements OnInit {
  overtimeForm: FormGroup;
  projectList: Array<Projects>;
  selectedProject: Projects;

  constructor(private router: Router, private overtime: MyovertimeService) {
    this.projectList = [
      {id: '1', name: "Project1"},
      {id: '2', name: "Project2"},
      {id: '3', name: "Project3"},
      {id: '4', name: "Project4"}
    ];
    this.selectedProject = {id: '1', name: "Project1"};
    this.overtimeForm = this.createFormGroup();
   }

  ngOnInit() { 
  }

  onSubmit() {
   // Make sure to create a deep copy of the form-model
  // this.overtimeModel = new OvertimeModel(this.overtimeForm.value);
   // Do useful stuff with the gathered data
   var myOvertime = new OvertimeModel()
   myOvertime = this.overtimeForm.value;
   var to = moment(this.overtimeForm.value.timeto, 'HH:mm:ss');
   var from = moment(this.overtimeForm.value.timefrom, 'HH:mm:ss');
   console.log(to.diff(from, 'hours'));
   console.log(to.diff(from, 'minutes'));
   var duration = moment.duration(to.diff(from))
   var minutes = duration.minutes();
   
   console.log(this.overtimeForm.value.projectName)
   //console.log(totalTime);
  // this.overtime.addOvertime(this.overtimeForm.value)
  myOvertime.totalTime = to.diff(from, 'minutes')
  myOvertime.project = this.overtimeForm.value.projectName.name
  console.log(myOvertime);
  this.overtime.addOvertime(this.overtimeForm.value)  
  this.overtimeForm.reset()
  this.router.navigate(['myovertime'])
  }

goBackToList(){
  this.overtimeForm.reset();
  this.router.navigate(['myovertime'])
}
  createFormGroup() {
    return new FormGroup({
      firstname: new FormControl('', [Validators.required, forbiddenNameValidator(/bob|anna/gi)]),
      lastname: new FormControl('', [Validators.required, forbiddenCharactersValidator(/@|!|#/gi)]),
      timeto: new FormControl('', [Validators.required] ),
      timefrom: new FormControl('', [Validators.required] ),
      date: new FormControl('', [Validators.required] ),
      comment: new FormControl('', [Validators.required]),
      projectName: new FormControl(this.selectedProject, [Validators.required])
    });
  }

 
  // need to define geters for every form control so we can check if the control is valid or not
  get firstname(){
    return this.overtimeForm.get('firstname')
  }
  get lastname(){
    return this.overtimeForm.get('lastname')
  }
  get timeto(){
    return this.overtimeForm.get('timeto')
  }
  get timefrom(){
    return this.overtimeForm.get('timefrom')
  }
  get date(){
    return this.overtimeForm.get('date')
  }
  get comment(){
    return this.overtimeForm.get('comment')
  }
  get projectName(){
    return this.overtimeForm.get('projectName')
  }
  

}
