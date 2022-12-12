import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { animate, trigger, state, style, transition, query } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-grouped-table',
  templateUrl: './grouped-table.component.html',
  styleUrls: ['./grouped-table.component.css']
})

export class GroupedTableComponent implements OnInit {
  
  @Input() set _dataSource(value: any[]) {
    this._alldata = value;

    if (isNullOrUndefined(this._alldata)) { return };
    this.dataSource.data =this._alldata;
  // this.dataSource.filter = performance.now().toString();
  }
  
  //задаем названия полей
  @Input() set _columns(value: any[]){
    this.columns = value;
    this.displayedColumns=[];
    this.displayedColumnsName=[];
    this.ColumnLength=[];

    this.columns.forEach(v=> {
      this.ColumnLength.push(v.length);
    });

    this.columns.forEach(v => {
      this.displayedColumns.push(v.field);
      this.displayedColumnsName.push(v.disp);
    });
   
  }
  
  @Input() set _filter(value: string) {
   
    if (isNullOrUndefined(this._alldata)) { return };
    this.dataSource.data = this._alldata;
    if(!isNullOrUndefined(value) && value.length>0){
    this.dataSource.filter = value.trim().toLowerCase();
    }
    else {
      this.dataSource.filter= '';
      this.dataSource.data=this._alldata;
    } 
      
  }

  //addService()
  @Output() addcrudclick = new EventEmitter();
  addcrud() {
    this.addcrudclick.emit();
  }
  //editclick
  @Output() editcrudclick = new EventEmitter<any>();
  editcrud(row: any) {
    this.editcrudclick.emit(row);
  }

  @Output() delcrudclick = new EventEmitter<any>();
  delcrud(row: any) {
    this.delcrudclick.emit(row);
  }

  @Output() fldclick = new EventEmitter<any>();
  fld_cnt_row(row: any) {
    this.fldclick.emit(row);
  }

  
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  sort: Sort;
  ColumnLength : string[] = [];



  public dataSource = new MatTableDataSource<any>([]);
  _alldata: any[];
  columns: any[];
  filter: string = '';
  constructor() {
   
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  ngOnInit() {
   /* this.columns = this._columns;
    this.columns.forEach(v => {
      this.displayedColumns.push(v.field);
    });*/
   
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.matSort;
    if (isNullOrUndefined(this._alldata)) { return };
    this.dataSource.data =this._alldata;
    this.dataSource.filter = performance.now().toString();
    
  }
  
}
