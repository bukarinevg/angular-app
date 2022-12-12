import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.service';
import { ServiceSettingsResponse, BufferSettingsResponse } from 'src/model/user.model';

@Component({
  selector: 'app-serv-sets-add',
  templateUrl: './serv-sets-add.component.html',
  styleUrls: ['./serv-sets-add.component.css']
})
export class ServSetsAddComponent implements OnInit {
  fields: boolean;
  ServiceSet: FormGroup;
  showSpinner = false;
  submitted = false;
  invalidLogin: boolean = false;
  error = '';
  isLoadingResults = false;
  serv_id: string;
  fld_cnt_color: string;
  bufferlist: any[];
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private api_service: ApiService, private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
   
 
     
    this.serv_id = this.route.snapshot.paramMap.get('serv_id');
    this.ServiceSet = this.formBuilder.group({
      service_name: ['', Validators.compose([Validators.required])],
      collection_name: ['', Validators.required],
      note: [''],
      cache_type: ['', Validators.required], 
      cache_server_url: ['', Validators.required],
      source_url: ['', Validators.required],
      source_buffer_id: [''],
      life_time: ['', Validators.required],
      refresh_time: ['', Validators.required],
      refresh_count: ['', Validators.required],
      blocked_status: ['1',],
      blocked_date: [{value : '',disabled:true},],
      blocked_by: [{value : '',disabled:true},],
      modified_date: [{value : '',disabled:true},],
      modified_account: [{value : '',disabled:true}]

    });
    this.ServiceSet.controls.refresh_time.valueChanges.subscribe(value =>{ 
      if(this.ServiceSet.controls.cache_type.value =='2'){
        this.ServiceSet.controls.life_time.setValue(this.ServiceSet.controls.refresh_time.value * this.ServiceSet.controls.refresh_count.value);
      }
    });
    this.ServiceSet.controls.refresh_count.valueChanges.subscribe(value =>{
      if(this.ServiceSet.controls.cache_type.value =='2'){
        this.ServiceSet.controls.life_time.setValue(this.ServiceSet.controls.refresh_time.value * this.ServiceSet.controls.refresh_count.value);
      }
    });
    this.api_service.getBuffSettings(null).subscribe((ret: BufferSettingsResponse) => {
     // this.bufferlist = ret.items.filter(item=>(item.buffer_type==2)); Возможно будут нужны только логические буферы
    
      this.bufferlist = ret.items;
      this.isLoadingResults=false;
   
    if (this.serv_id !== null) {
      this.api_service.getServSettings(this.serv_id).subscribe((ret: ServiceSettingsResponse) => {
        //  console.log(ret.items[0]);
        if (ret.items[0].fld_cnt > 0) this.fields = true
        else this.fields = false;


        this.ServiceSet = this.formBuilder.group({
          service_name: [ret.items[0].service_name, Validators.compose([Validators.required])],
          collection_name: [ret.items[0].collection_name, Validators.required],
          note: [ret.items[0].note],
          cache_type: [ret.items[0].cache_type.toString(), Validators.required],
          cache_server_url: [ret.items[0].cache_server_url, Validators.required],
          source_url: [ret.items[0].source_url, Validators.required],
          source_buffer_id: [ ret.items[0].source_buffer_id !=null ? ret.items[0].source_buffer_id.toString():null],
          life_time: [ret.items[0].life_time, Validators.required],
          refresh_time: [ret.items[0].refresh_time, Validators.required],
          refresh_count: [ret.items[0].refresh_count, Validators.required],
          blocked_status: [ret.items[0].blocked.toString()],
          blocked_date: [{value : ret.items[0].blocked_date,disabled:true},],
          blocked_by: [{value : ret.items[0].blocked_by,disabled:true}],
          modified_date: [{value : ret.items[0].modif_date,disabled:true},],
          modified_account: [{value : ret.items[0].modifed_by,disabled:true},]

        });
        console.log(this.ServiceSet);
        this.ServiceSet.controls.refresh_time.valueChanges.subscribe(value =>{ 
          if(this.ServiceSet.controls.cache_type.value =='2'){
            this.ServiceSet.controls.life_time.setValue(this.ServiceSet.controls.refresh_time.value * this.ServiceSet.controls.refresh_count.value);
          }
        });
        this.ServiceSet.controls.refresh_count.valueChanges.subscribe(value =>{
          if(this.ServiceSet.controls.cache_type.value =='2'){
            this.ServiceSet.controls.life_time.setValue(this.ServiceSet.controls.refresh_time.value * this.ServiceSet.controls.refresh_count.value);
          }
        });
        this.change_type(ret.items[0].cache_type);
        if (ret.items[0].fld_cnt > 0)
          this.fld_cnt_color = "green"; else this.fld_cnt_color = "red";
        this.isLoadingResults = false;
       // this.change_type(this.ServiceSet.controls.cache_type.value);
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
      }, (err: any) =>{ console.log(err); this.isLoadingResults = false;});

    }
  }, 
  (err: any) => { console.log(err); this.isLoadingResults = false;}
  );
  }

  change_refresh(event){
      if(this.ServiceSet.controls.cache_type.value =='2'){
        this.ServiceSet.controls.life_time.setValue(this.ServiceSet.controls.refresh_time.value * this.ServiceSet.controls.refresh_count.value);
      }
  }

  on_change_type(event) {
    this.change_type(event.value);
  }
  
  change_type(ch_type) {
    if (ch_type == 1) {
      
      this.ServiceSet.controls.source_buffer_id.setValue(null);
      this.ServiceSet.controls.refresh_time.setValue(0);
      this.ServiceSet.controls.refresh_count.setValue(0);
      this.ServiceSet.controls.refresh_time.disable();
      this.ServiceSet.controls.refresh_count.disable();
      this.ServiceSet.controls.life_time.enable();
      this.ServiceSet.controls.source_buffer_id.disable();
    }
    if (ch_type == 2) {
     
      this.ServiceSet.controls.source_buffer_id.setValue(null);
      this.ServiceSet.controls.refresh_time.enable();
      this.ServiceSet.controls.refresh_count.enable();
      this.ServiceSet.controls.life_time.disable();
      this.ServiceSet.controls.life_time.setValue(this.ServiceSet.controls.refresh_time.value * this.ServiceSet.controls.refresh_count.value);
      this.ServiceSet.controls.source_buffer_id.disable();
    }
    if (ch_type == 3) {
      this.ServiceSet.controls.source_buffer_id.enable();
      this.ServiceSet.controls.refresh_time.setValue(0);
      this.ServiceSet.controls.refresh_count.setValue(0);
      this.ServiceSet.controls.life_time.enable();
      this.ServiceSet.controls.refresh_time.disable();
      this.ServiceSet.controls.refresh_count.disable();
    } else this.ServiceSet.controls.source_buffer_id.disable();

  }
  undo() {
    this.router.navigate(['servlist/']);
  }

  onServFldClick() {

    this.router.navigate(['servfields/' + this.serv_id]);
  }
  onSubmit() {


    if (this.ServiceSet.invalid) {
      return;
    } else
      this.isLoadingResults = true;
    if (this.serv_id == null) {
      this.api_service.addServSetting(this.ServiceSet.controls.service_name.value, this.ServiceSet.controls.collection_name.value, this.ServiceSet.controls.note.value,
        this.ServiceSet.controls.cache_type.value, this.ServiceSet.controls.cache_server_url.value, this.ServiceSet.controls.source_url.value,
        this.ServiceSet.controls.source_buffer_id.value, this.ServiceSet.controls.life_time.value, this.ServiceSet.controls.refresh_time.value,
        this.ServiceSet.controls.refresh_count.value, this.auth.currentUserValue.adm_user_id).subscribe((ret: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['editserv/' + ret.p_service_id]);
        }, (err: any) =>{ console.log(err); this.isLoadingResults = false;}

        );
    } else {
      this.api_service.editServSetting(Number(this.serv_id), this.ServiceSet.controls.service_name.value, this.ServiceSet.controls.collection_name.value, this.ServiceSet.controls.note.value,
        this.ServiceSet.controls.cache_type.value, this.ServiceSet.controls.cache_server_url.value, this.ServiceSet.controls.source_url.value,
        this.ServiceSet.controls.source_buffer_id.value, this.ServiceSet.controls.life_time.value, this.ServiceSet.controls.refresh_time.value,
        this.ServiceSet.controls.refresh_count.value, this.auth.currentUserValue.adm_user_id, this.ServiceSet.controls.blocked_status.value).subscribe((ret: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['servlist/']);
        }, (err: any) =>{ console.log(err); this.isLoadingResults = false;}

        );
    }
  }
}
