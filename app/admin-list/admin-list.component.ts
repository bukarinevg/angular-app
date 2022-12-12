import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceFieldsResponse, ServiceFields } from 'src/model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServFieldsDialogComponent } from '../serv-fields-dialog/serv-fields-dialog.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  filterValue: string;
  filterEmpty: boolean;
  isLoadingResults = false;

  dataValue: any[];
  columnsValue: any[] = [];
  data: FormGroup;
  allcolumnsValue: any[];

  constructor(
    private api_service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private auth: AuthService
  ) 
  { 
    this.allcolumnsValue = [
    
      //{ field: '@delete@',disp:'Удалить'},  
      { field: 'admin_id' ,disp:'ID' },
      { field: 'admin_login',disp:'Логин' },  
      { field: 'admin_name' ,disp:'Фамилия имя'},
      { field: 'admin_email' ,disp:'E-mail'},
      { field: 'admin_phone' ,disp:'Номер телефона'},
      { field: 'admin_status' ,disp:'Cтатус'},
      { field: 'change_pass_date' ,disp:'Дата последней смены пароля'},
      { field: 'admin_creation_date' ,disp:'Дата создания'},
      { field: 'admin_change_information' ,disp:'Дата последнего изменения'},
      { field: 'admin_changername' ,disp:'Учетная запись, под которой выполнено последние изменение'}
    ];
  }

  ngOnInit(): void {
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
}
