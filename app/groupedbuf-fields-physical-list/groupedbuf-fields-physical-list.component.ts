import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BufferFieldsResponse, BufferFields } from 'src/model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GrphysBuffDialogComponent } from '../grphys-buff-dialog/grphys-buff-dialog.component';
import { AuthService,  } from 'src/services/auth.service';


@Component({
  selector: 'app-groupedbuf-fields-physical-list',
  templateUrl: './groupedbuf-fields-physical-list.component.html',
  styleUrls: ['./groupedbuf-fields-physical-list.component.css']
})
export class GroupedbufFieldsPhysicalListComponent implements OnInit {
  buff_id: string;
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
      { field: 'buffer_fld_id', disp: 'Код поля' },
      { field: 'fld_name', disp: 'Имя поля' },
      { field: 'source_fld_name', disp: 'Имя поля из источника' },
      { field: 'fld_type', disp: 'Тип поля' },
      { field: 'key_field', disp: 'Признак ключевого поля' },
      { field: 'modif_date', disp: 'Дата изменения' },
      { field: 'modifed_by', disp: 'Изменил' },
      { field: 'edit', disp: 'Изменить' }
    ];
  }

  ngOnInit(): void {
    this.buff_id = this.route.snapshot.paramMap.get('buffer_id');
    this.getData();
    
  }


  getData() {
    this.isLoadingResults = true;
    this.api_service.getGroupedBufferFields(this.buff_id).subscribe((ret: BufferFieldsResponse) => {
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
      buffer_id: [this.buff_id]
      // fld_id: ['', Validators.required],

    });
    const dialogRef = this.dialog.open(GrphysBuffDialogComponent, {
      width: '600px',
      height: '600px',

      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result == '') {
        console.log("JustCancle");
      } else {
        this.data = result;
        this.api_service.addGrPhysBuffField(
          this.data.controls.buffer_id.value,
          this.data.controls.fld_name.value,
          this.data.controls.source_fld_name.value,
          this.data.controls.fld_type.value,
          this.data.controls.key_field.value,
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
      buffer_id: [this.buff_id],
      buffer_fld_id: [row.buffer_fld_id, Validators.required]

    });
    const dialogRef = this.dialog.open(GrphysBuffDialogComponent, {
      width: '600px',
      height: '600px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        console.log("JustCancle");
      } else {
        this.data = result;
        this.api_service.editGrPhysBuffField(
          this.data.controls.buffer_id.value,
          this.data.controls.buffer_fld_id.value, 
          this.data.controls.fld_name.value,
          this.data.controls.source_fld_name.value,
          this.data.controls.fld_type.value,
          this.data.controls.key_field.value,
          this.auth.currentUserValue.adm_user_id).subscribe(x => { this.getData(); })
      }
    });

  }

}
