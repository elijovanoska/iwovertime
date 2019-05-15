import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyovertimeComponent } from './myovertime.component';
import { AddNewOvertimeComponent } from './add-new-overtime/add-new-overtime.component';
import { AuthGuard } from '../../services/auth/auth-guard';
import { MyovertimelistComponent } from './myovertimelist/myovertimelist.component';
import { MyovertimeChartsComponent } from './myovertime-charts/myovertime-charts.component';

const routes: Routes = [
    {
        path: '',
        component: MyovertimeComponent ,data: {}  , canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: MyovertimelistComponent,data: {}, canActivate: [AuthGuard]
            },
            {
                path: 'add',
                component: AddNewOvertimeComponent,data: {}, canActivate: [AuthGuard]
            },
            {
                path: 'charts',
                component: MyovertimeChartsComponent, data: {}, canActivate: [AuthGuard]
            }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class MyovertimeRoutingModule { }