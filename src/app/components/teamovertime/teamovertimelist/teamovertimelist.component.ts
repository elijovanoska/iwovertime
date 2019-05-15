import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MyovertimeService } from '../../../services/myovertime.service';
import { OvertimeModel } from '../../../models/overtime.model';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatSort, MatPaginator, MatSortable} from '@angular/material';
/* import { DataSource } from '@angular/cdk/table'; */
//import TableToExcel from "@linways/table-to-excel";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-teamovertimelist',
  templateUrl: './teamovertimelist.component.html',
  styleUrls: ['./teamovertimelist.component.css']
})
export class TeamovertimelistComponent implements OnInit, AfterViewInit {

  itemRows: OvertimeModel[];
  index: number

  displayedColumns: string[] = ['firstname', 'lastname', 'timefrom', 'timeto',  'date','comment', 'totaltime'];
  dataSource = new MatTableDataSource<OvertimeModel>([]);
  selection = new SelectionModel<OvertimeModel>(true, []);
  resultsLength = 0

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 


  constructor(private myOvertimeService: MyovertimeService) {}
 
  ngOnInit() {

    //
   
    var loginUser = JSON.parse(localStorage.getItem("user"));
    console.log("login user")
   var myList = [];
     const overtimeListObs = this.myOvertimeService.getAllOvertimeList();
     overtimeListObs
     .subscribe((item: OvertimeModel) => {
       console.log("dsjcndsjkcnkdc");
       console.log(item);
       item.date = new Date(item.date)
       myList.push(item);
     });
 
     
     this.itemRows = myList   
     this.resultsLength = this.itemRows.length 
     console.log(myList); 
     setTimeout(()=>{
      this.dataSource = new MatTableDataSource(this.itemRows)
      this.dataSource.data = this.itemRows
     });
    
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  getTotalTime(){
    return this.itemRows.map(t => t.totalTime).reduce((acc, value) => acc + value, 0);
  }

  ngAfterViewInit (){
     setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.itemRows)
      this.dataSource.paginator = this.paginator;
      this.sort.sort(<MatSortable>({id: 'totalTime', start: 'desc'}));
      this.dataSource.sort = this.sort;
  });
    
  }

/*   convertToExcel(){
    TableToExcel.convert(document.getElementById("myTable"), {
      name: "overtimeTable.xlsx",
      sheet: {
        name: "Sheet 1"
      }
    });
  } */

  convertToExcel(){
    //console.log(data)
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
   // const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(data);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  convertToPDF(){
    const doc = new jsPDF();
    doc.autoTable({html: '#myTable'});
    doc.save('table.pdf')
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
