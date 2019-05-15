import { Component, OnInit } from '@angular/core';
import _ from "lodash";
import { OvertimeModel } from '../../../models/overtime.model';
import { MyovertimeService } from '../../../services/myovertime.service';

@Component({
  selector: 'app-teamovertime-charts',
  templateUrl: './teamovertime-charts.component.html',
  styleUrls: ['./teamovertime-charts.component.css']
})
export class TeamovertimeChartsComponent implements OnInit {

  constructor(private myOvertimeService: MyovertimeService) { }

  tableList: OvertimeModel[]
  firstSetName: ''
  secondSetName:''
  dataset1: null
  dataset2: null
  ngOnInit() {
    var myList = [];
    const overtimeListObs = this.myOvertimeService.getAllOvertimeList();
    overtimeListObs
    .subscribe((item: OvertimeModel) => {
      myList.push(item);
    });

    const Array = myList;
    const Property = "firstname";
    const resultList = _.groupBy(Array, Property);
    console.log(resultList);
    for (let i = 0; i < resultList.length; i++) {
      const element = resultList[i];
      if(i==0)
      {
        this.firstSetName = element;
      }
      if(i==1) this.secondSetName = element;
      
    }
  }
  public chartType: string = 'line';

 public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: this.firstSetName },
    { data: [28, 48, 40, 19, 86, 27, 90], label: this.secondSetName }/* ,
    { data: [0, 15, 22, 24, 45,2, 1], label: 'My Third dataset' } */
  ];
 
  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(101, 75, 144, .7)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  ///pie chart
  public chartTypePie: string = 'pie';

  public chartDatasetsPie: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  public chartLabelsPie: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColorsPie: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptionsPie: any = {
    responsive: true
  };
  public chartClickedPie(e: any): void { }
  public chartHoveredPie(e: any): void { }
}
