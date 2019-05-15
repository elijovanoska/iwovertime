import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth-guard';
import { TeamovertimelistComponent } from './teamovertimelist/teamovertimelist.component';
import { TeamovertimeComponent } from './teamovertime.component';
import { TeamovertimeChartsComponent } from './teamovertime-charts/teamovertime-charts.component';


const routes: Routes = [
    {
        path: '',
        component: TeamovertimeComponent ,  data: {}  ,canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: TeamovertimelistComponent,data: {}, canActivate: [AuthGuard]
            },
            {
                path: 'charts',
                component: TeamovertimeChartsComponent, data: {}, canActivate: [AuthGuard]
            }
        ]
    }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TeamovertimeRoutingModule { }