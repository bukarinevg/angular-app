import { Component, OnInit } from '@angular/core';
import { Directive, HostListener } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { BufferSettingsResponse, AccountResponse, LogicBufferSettingsResponse } from 'src/model/user.model';
import { FullsyncintervalsDialogComponent } from '../fullsyncintervals-dialog/fullsyncintervals-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-gr-logic-buff',
  templateUrl: './edit-gr-logic-buff.component.html',
  styleUrls: ['./edit-gr-logic-buff.component.css']
})
export class EditGrLogicBuffComponent implements OnInit {

  
  sync_type = '';
  mixed_sync_type : boolean;
  data: any;
  update_setting: boolean;
  fields: boolean;
  BufferSettings: FormGroup;
  showSpinner = false;
  submitted = false;
  invalidLogin: boolean = false;
  error = '';
  isLoadingResults = false;
  buffer_id: string;
  fld_cnt_color: string;


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api_service: ApiService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  
    this.buffer_id = this.route.snapshot.paramMap.get('buffer_id');
    
    this.BufferSettings = this.formBuilder.group({
      buffer_name: ['', Validators.compose([Validators.required])],
      buffer_type: ['2', Validators.required],
      source_name: ['', Validators.required],
      blocked: ['1', Validators.required],
      blocked_date: [''],
      modified_date: [''],
      modified_account: ['',],
      note : ['', ]
    });

      
      if (this.buffer_id !== null) { 
        this.api_service.getLogicBuffSettings(this.buffer_id).subscribe((ret: LogicBufferSettingsResponse) => {
          this.data = ret.items[0];
          console.log(this.data);
          this.BufferSettings = this.formBuilder.group({
            buffer_name: [ret.items[0].buffer_name, Validators.compose([Validators.required])],
            buffer_type: [ret.items[0].buffer_type.toString(), Validators.required],
            source_name: [ret.items[0].source_name],
            blocked: [ret.items[0].blocked.toString(), Validators.required],
            blocked_date: [ret.items[0].blocked_date,],
            modified_date: [ret.items[0].modif_date,],
            modified_account: [ret.items[0].modifed_by,],
            note: [ret.items[0].note]
          });
      
          
      
          if (ret.items[0].fld_cnt > 0) {
            this.fields = true;
            this.fld_cnt_color = "green"
          }
          else {
            this.fld_cnt_color = "red"
            this.fields = false;
          }
          this.isLoadingResults = false;
        }, (err: any) => console.log(err));

      
    }
  }

  

  undo() {
    this.router.navigate(['groupedbuflist/']);
  }

  onServFldClick() {

    this.router.navigate(['groupedbuffieldlist/' + this.buffer_id]);
  }


  onSubmit() {
    
    if (this.BufferSettings.invalid) {
      console.log('some not valid');
      return;
    } else
      this.isLoadingResults = true;



    if (this.buffer_id == null) {

      this.api_service.addGroupedBufferPhysicalSettings(
        this.BufferSettings.controls.buffer_name.value, 
        this.BufferSettings.controls.buffer_type.value, 
        null,
        this.BufferSettings.controls.source_name.value, 
        null, 
        null, 
        null,
        null, 
        null,
        null, 
        this.BufferSettings.controls.blocked.value,
        this.auth.currentUserValue.adm_user_id, 
        this.BufferSettings.controls.note.value
        ).subscribe((ret: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['editlogicgrbuff/' + ret.p_buffer_id]);
        }, (err: any) =>{ console.log(err); this.isLoadingResults = false;}

        );
    } else {

      this.api_service.editGroupedBufferPhysicalSettings(
        Number(this.buffer_id), 
        this.BufferSettings.controls.buffer_name.value, 
        this.BufferSettings.controls.buffer_type.value, 
        this.data.source_type,
        this.BufferSettings.controls.source_name.value, 
        this.data.acc_id, 
        this.data.mixed_sync_value, 
        this.data.full_sync,
        this.data.full_sync_allow_interval, 
        this.data.inc_sync,
        this.data.sync_interval, 
        this.data.sync_error_delay, 
        this.BufferSettings.controls.blocked.value,
         this.auth.currentUserValue.adm_user_id, 
         this.BufferSettings.controls.note.value
        
         ).subscribe((ret: any) => {
          this.isLoadingResults = false;

        }, (err: any) =>{ console.log(err); this.isLoadingResults = false;}

        );

    }




  }

 
}


