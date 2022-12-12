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
import { ServiceSettingsResponse } from 'src/model/user.model';

@Component({
  selector: 'app-serv-sets-list',
  templateUrl: './serv-sets-list.component.html',
  styleUrls: ['./serv-sets-list.component.css']
})
export class ServSetsListComponent implements OnInit {

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
    { field: 'service_id' ,disp:'ID' },
    { field: 'service_name',disp:'Имя' },  
    { field: 'collection_name' ,disp:'Коллекция'},
    { field: 'cache_type' ,disp:'Тип'},
    { field: 'note' ,disp:'[Описание]'},
    { field: 'cache_server_url' ,disp:'Адрес'},
    { field: 'source_buffer_id' ,disp:'Буфер'},
    { field: 'source_url' ,disp:'Источник'},
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

  getData() {
   let tempcols = this.allcolumnsValue;
    this.columnsValue = tempcols;
    this.isLoadingResults=true;
      this.api_service.getServSettings(null).subscribe((ret: ServiceSettingsResponse) => {
         this.dataValue = ret.items;
         this.dataValue.forEach(v => {
          if (v.blocked === 0) {
            v.blocked='A';
          }
          else{
            v.blocked='B';
          }
         });
         this.isLoadingResults=false;
        /*  this.dataValue = ret.images.map(r => r =
          {
            project_id: r.project_id,
            project_name: this.projectsValue.find(pv => pv.id == r.project_id).name,
            user_id: r.user_id,
            policy_id: r.policy_id,
            policy_name: this.policiesDictValues.find(pdv => pdv.id == r.policy_id).name,
            created: r.created,
            image_id: r.image_id,
            checked_by: r.checked_by,
            accuracy: r.accuracy,
          }
          );*/
        }, (err: any) => console.log(err));
      
  }
  addService(){
    this.router.navigate(['editserv']);    
  } 
  editclick(row:any){
    this.router.navigate(['editserv/'+row.service_id]); 
  }
  servFldC1lick(row:any){
      this.router.navigate(['servfields/' + row.service_id]);    
  }
 
  
}
