import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { TeamovertimeRoutingModule } from './teamovertime-routing.module';

import { TeamovertimeComponent } from './teamovertime.component';
import { TeamovertimelistComponent } from './teamovertimelist/teamovertimelist.component';
import { TeamovertimeChartsComponent } from './teamovertime-charts/teamovertime-charts.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCardModule, MatProgressSpinnerModule, MatMenuModule, 
         MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
         MatSelectModule, MatTableModule, MatInputModule, MatCheckboxChange, MatCheckboxModule,MatSortModule, MatPaginatorModule  } from '@angular/material';





@NgModule({
  imports: [
    CommonModule,
    TeamovertimeRoutingModule,
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
    MatCheckboxModule  ,
    MatSortModule,
    MatPaginatorModule   
  ],
  declarations: [
    TeamovertimeComponent,
    TeamovertimelistComponent,
    TeamovertimeChartsComponent
  ],
  exports: [
    TeamovertimeComponent,
    TeamovertimeRoutingModule,
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
    MatCheckboxModule  ,
    MatSortModule,
    MatPaginatorModule   
  ]
})
export class TeamovertimeModule { }
