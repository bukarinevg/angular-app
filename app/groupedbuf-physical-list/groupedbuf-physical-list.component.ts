import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, trigger, state, style, transition, query } from '@angular/animations';
import { isNullOrUndefined } from 'util';
import { GroupedTableComponent } from '../grouped-table/grouped-table.component';
import { forkJoin, of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { ApiService } from 'src/services/api.service';
import {  BufferSettingsResponse } from 'src/model/user.model';
@Component({
  selector: 'app-groupedbuf-physical-list',
  templateUrl: './groupedbuf-physical-list.component.html',
  styleUrls: ['./groupedbuf-physical-list.component.css']
})
export class GroupedbufPhysicalListComponent implements OnInit {

  filterValue: string;
  filterEmpty: boolean;
  isLoadingResults = false;

 
  dataValue: any[];

  policiesDictValues: any[];
  columnsValue: any[] = [];
  allcolumnsValue: any[];
  projectsValue: any[];

  projusersValue: any[];
  usersValueDict: any[];
  usersValue: any[];

  policiesValue: any[];
  private policiesSelectedValue = [];
  constructor( 
    private auth: AuthService,
    private api_service: ApiService,
    private route: ActivatedRoute,
    private router: Router
) {  
    this.allcolumnsValue = [
    
    //{ field: '@delete@',disp:'Удалить'},  
    { field: 'buffer_id' ,disp:'ID' },
    { field: 'buffer_name',disp:'Имя' },  
    { field: 'source_type' ,disp:'Способ обновления'},
    { field: 'source_name' ,disp:'Имя источника'},
    { field: 'sync_type' ,disp:'Тип синхронизации'},
    { field: 'blocked' ,disp:'Статус'},
    { field: 'fld_cnt' ,disp:'Поля'},
    { field: 'edit' ,disp:'Изменить'},
  ];
}

  ngOnInit(): void {
   this.getData();
  }

  public set filter(value: string) {
      const queryParams = { filter: value };
      this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' });
      this.filterValue = value;
    
  }

  public get filter() {
    if (this.filterEmpty === false) return this.filterValue
    else return ;
  }

  changeFormat()
  {
    this.dataValue.forEach(v => {


      if (v.sync_type === 0){
        v.sync_type = 'Полная';
      }
      else if (v.sync_type === -1){
        v.sync_type = 'Инкрементальная';
      }
      else  if (v.sync_type > 0){
        v.sync_type = 'Смешанная'; 
      }

      if (v.source_type === 1){
        v.source_type = 'БД';
      }
      else if (v.source_type === 2){
        v.source_type = 'REST API';
      }
      else  if (v.source_type === 3){
        v.source_type = 'не обновляется';
        v.sync_type='';
      }

      

      if (v.blocked === 1) {
        v.blocked='Блок';
      }
      else{
        v.blocked='Актив';
      }
     });
  
  }

  getData() {
    
   let tempcols = this.allcolumnsValue;
    this.columnsValue = tempcols;
    this.isLoadingResults=false;

      this.api_service.getBuffSettings(null).subscribe((ret: BufferSettingsResponse) => {
         this.dataValue = ret.items;
         this.changeFormat();
        
         this.isLoadingResults=false;
    
        }, 
        (err: any) => console.log(err)
        );
        
      
  }
  addService(){
    this.router.navigate(['editgroupphysbuff/']);    
  } 
  editclick(row:any){
    this.router.navigate(['editgroupphysbuff/'+row.buffer_id]); 
  }
  servFldC1lick(row:any){
      this.router.navigate(['groupedbuffieldlist/' + row.buffer_id]);    
  }
}
