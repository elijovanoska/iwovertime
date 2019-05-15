import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MyovertimeService } from '../../../services/myovertime.service';
import { OvertimeModel } from '../../../models/overtime.model';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import TableToExcel from "@linways/table-to-excel";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
/* export interface PeriodicElement {
  timeto: string;
  timefrom: string;
  totaltime: number;
  date: Date;
  comment: string;
} */
// ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-myovertimelist',
  templateUrl: './myovertimelist.component.html',
  styleUrls: ['./myovertimelist.component.css']
})
export class MyovertimelistComponent implements OnInit {

  itemRows: OvertimeModel[];
  index: number
  constructor(private myOvertimeService: MyovertimeService) { }
  @ViewChild('TABLE') table: ElementRef;
  ngOnInit() {
    var loginUser = JSON.parse(localStorage.getItem("user"));
    console.log("login user")
    var myList = [];
     const overtimeListObs = this.myOvertimeService.getMyOvertimeList(loginUser.uid);
     overtimeListObs
     .subscribe((item: OvertimeModel) => {
       console.log("dsjcndsjkcnkdc");
       console.log(item);
       myList.push(item);
     });

     
     this.itemRows = myList
     console.log(myList);
  }

  displayedColumns: string[] = [ 'timefrom', 'timeto',  'date','comment', 'totaltime'];
  dataSource = new MatTableDataSource<OvertimeModel>(this.itemRows);
  selection = new SelectionModel<OvertimeModel>(true, []);

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


/*   convertToExcel(){
    TableToExcel.convert(document.getElementById("myTable"), {
      name: "overtimeTable.xlsx",
      sheet: {
        name: "Sheet 1"
      }
    });
  } */

  convertToExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
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

}
