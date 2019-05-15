import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MyovertimeRoutingModule } from './myovertime-routing.module';

import { MyovertimeComponent } from './myovertime.component';
import { AddNewOvertimeComponent } from './add-new-overtime/add-new-overtime.component';
import { MyovertimelistComponent } from './myovertimelist/myovertimelist.component';
import { MyovertimeChartsComponent } from './myovertime-charts/myovertime-charts.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCardModule, MatProgressSpinnerModule, MatMenuModule, 
         MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
         MatSelectModule, MatTableModule, MatInputModule, MatCheckboxChange, MatCheckboxModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    MyovertimeRoutingModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule    
  ],
  declarations: [
    MyovertimeComponent,
    AddNewOvertimeComponent,
    MyovertimelistComponent,
    MyovertimeChartsComponent
  ],
  exports: [
    MyovertimeComponent,
    MyovertimeRoutingModule
  ]
})
export class MyovertimeModule { }
