import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceFieldsResponse, ServiceFields } from 'src/model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServFieldsDialogComponent } from '../serv-fields-dialog/serv-fields-dialog.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-serv-fields',
  templateUrl: './serv-fields.component.html',
  styleUrls: ['./serv-fields.component.css']
})
export class ServFieldsComponent implements OnInit {
  serv_id: string;
  isLoadingResults = false;
  dataValue: any[];
  columnsValue: any[] = [];
  filterValue: string;
  data: FormGroup;
  constructor(
    private api_service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private auth: AuthService
  ) {
    this.columnsValue = [
      { field: 'fld_id', disp: 'Код поля' },
      { field: 'fld_name', disp: 'Имя поля' },
      { field: 'source_fld_name', disp: 'Имя поля из источника' },
      { field: 'fld_type', disp: 'Тип поля' },
      { field: 'key_field', disp: 'Ключевое поле' },
      { field: 'fld_order', disp: 'Очерёдность поля' },
      { field: 'deflect_to_min', disp: 'Отклонение в меньшую сторону' },
      { field: 'deflect_to_max', disp: 'Отклонение в большую сторону' },
      { field: 'modif_date', disp: 'Дата изменения' },
      { field: 'modifed_by', disp: 'Изменил' },
      { field: 'edit', disp: 'Изменить' }
    ];
  }

  ngOnInit(): void {
    this.serv_id = this.route.snapshot.paramMap.get('serv_id');
    this.getData();
    
  }


  getData() {
    this.isLoadingResults = true;
    this.api_service.getServFields(this.serv_id).subscribe((ret: ServiceFieldsResponse) => {
      console.log(ret.items);
      this.dataValue = ret.items;
      this.isLoadingResults = false;
    }, (err: any) => console.log(err));
    
  }

  addService() {
    // servfieldadd

    this.data = this.formBuilder.group({
      fld_name: ['', Validators.required],
      source_fld_name: ['', Validators.required],
      fld_type: [''],
      key_field: ['0'],
      fld_order: [''],
      deflect_to_min: [''],
      deflect_to_max: [''],
      service_id: [this.serv_id]
      // fld_id: ['', Validators.required],

    });
    const dialogRef = this.dialog.open(ServFieldsDialogComponent, {
      width: '600px',
      height: '600px',

      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result == '') {
        console.log("JustCancle");
      } else {
        this.data = result;
        this.api_service.addServField(this.data.controls.service_id.value,
          this.data.controls.fld_name.value,
          this.data.controls.source_fld_name.value,
          this.data.controls.fld_type.value,
          this.data.controls.key_field.value,
          this.data.controls.fld_order.value,
          this.data.controls.deflect_to_min.value,
          this.data.controls.deflect_to_max.value,
          this.auth.currentUserValue.adm_user_id).subscribe(x => { this.getData(); })
      }
    });
  }

  editclick(row: any) {
    this.data = this.formBuilder.group({
      fld_name: [row.fld_name, Validators.required],
      source_fld_name: [row.source_fld_name, Validators.required],
      fld_type: [row.fld_type],
      key_field: [row.key_field.toString()],
      fld_order: [row.fld_order],
      deflect_to_min: [row.deflect_to_min],
      deflect_to_max: [row.deflect_to_max],
      service_id: [this.serv_id],
      fld_id: [row.fld_id, Validators.required]

    });
    const dialogRef = this.dialog.open(ServFieldsDialogComponent, {
      width: '600px',
      height: '600px',
      data: this.data
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        console.log("JustCancle");
      } else {
        this.data = result;
        this.api_service.editServField(this.data.controls.fld_id.value, this.data.controls.service_id.value,
          this.data.controls.fld_name.value,
          this.data.controls.source_fld_name.value,
          this.data.controls.fld_type.value,
          this.data.controls.key_field.value,
          this.data.controls.fld_order.value,
          this.data.controls.deflect_to_min.value,
          this.data.controls.deflect_to_max.value,
          this.auth.currentUserValue.adm_user_id).subscribe(x => { this.getData(); })
      }
    });

  }
}
