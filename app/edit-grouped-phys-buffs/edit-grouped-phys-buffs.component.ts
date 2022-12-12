import { Component, OnInit } from '@angular/core';
import { Directive, HostListener } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { BufferSettingsResponse, AccountResponse } from 'src/model/user.model';
import { FullsyncintervalsDialogComponent } from '../fullsyncintervals-dialog/fullsyncintervals-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Utils } from '../utils';
@Component({
  selector: 'app-edit-grouped-phys-buffs',
  templateUrl: './edit-grouped-phys-buffs.component.html',
  styleUrls: ['./edit-grouped-phys-buffs.component.css']
})
export class EditGroupedPhysBuffsComponent implements OnInit {

  interval : boolean;
  sync_type = '';
  mixed_sync_type : boolean;
  interval_string: string;
  intervals_data: FormGroup;
  intervals: string;
  full_sync_allow_interval: any;
  accounts: any;
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
    // получаем параметр переданный в адресной строке конкретно ид буфера групового
    this.buffer_id = this.route.snapshot.paramMap.get('buffer_id');
    //Создаём пустую форму чтоб сразу отрисовать элементы
    this.BufferSettings = this.formBuilder.group({
      buffer_name: ['', Validators.compose([Validators.required])],
      buffer_type: ['1', Validators.required],
      source_type: ['', Validators.required],
      source_name: ['',],
      acc_id: ['',],
      sync_type: ['', Validators.min(-1)],
      mixed_sync_value : ['', Validators.min(0)],
      full_sync: ['',],
      full_sync_allow_interval: ['',],
      text_allow_interval: [''],
      inc_sync: ['',],
      sync_interval: [''],
      sync_error_delay: ['',],
      blocked: ['1', Validators.required],
      blocked_date: [''],
      blocked_by: [''],
      modified_date: [''],
      modified_account: ['',],
      note: ['']
    });

    // Задание на получение аккаунтов для обновления и acc_id это связка с таблицей accounts а не с admin_user
    // subscribe это подписка, т.е. после того как пришли данные будет выполнен код внутри тут всё асинхронное соответственно некоторые дечтвия нужно вставлять внутьрь 
    // после дого как получишь какие-то справочные анные.
    this.api_service.getAccounts().subscribe((accs: AccountResponse) => {
      this.accounts = accs.items;
      // Проверяем это изменение существующего или создание нового
      if (this.buffer_id !== null) {
        // Подгрузку данных буфера бы делаем внутри подписки для того чтобы в нашем комбобоксе выбрался нужный аккаунт иначе если сначала загрузить буфер а потом аккаунты
        // не выбирится тот что был т.к. на момент выбора комбобокс будет пустой комбобоск это <select>
        this.api_service.getBuffSettings(this.buffer_id).subscribe((ret: BufferSettingsResponse) => {
          ret.items[0];
          this.BufferSettings = this.formBuilder.group({
            buffer_name: [ret.items[0].buffer_name, Validators.compose([Validators.required])],
            buffer_type: [ret.items[0].buffer_type.toString(), Validators.required],
            source_type: [ret.items[0].source_type.toString(), Validators.required],
            source_name: [ret.items[0].source_name],
            acc_id: [ret.items[0].acc_id != null ? ret.items[0].acc_id.toString() : null,],
            sync_type: [ret.items[0].sync_type.toString(),],
            mixed_sync_value : [ret.items[0].sync_type],
            full_sync: [ret.items[0].full_sync,],
            //Закодированное значение интервала
            full_sync_allow_interval: [ret.items[0].full_sync_allow_interval],
            //Расскодированное значение интервала
            text_allow_interval: [Utils.decodeInterval(ret.items[0].full_sync_allow_interval)],
            inc_sync: [ret.items[0].inc_sync],
            sync_interval: [ret.items[0].sync_interval],
            sync_error_delay: [ret.items[0].sync_error_delay],
            blocked: [ret.items[0].blocked.toString(), Validators.required],
            blocked_date: [ret.items[0].blocked_date,],
            modified_date: [ret.items[0].modif_date,],
            modified_account: [ret.items[0].modifed_by,],
            note: [ret.items[0].note]
          });
        
          // Для того чтобы обязательность полей соответствовала правилам
          this.check_avail_flds();
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
    },
      (err: any) => console.log(err));
  }

  

  editIntervals() {
  
    const dialogRef = this.dialog.open(FullsyncintervalsDialogComponent,
      {
        width: '600px',
        height: '600px',
        data: this.BufferSettings.controls.full_sync_allow_interval.value
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result === '') {

      }
      else {
        // Изменил добавление интервалов 
        this.BufferSettings.controls.full_sync_allow_interval.setValue(result);
        this.BufferSettings.controls.text_allow_interval.setValue(Utils.decodeInterval(result));
      }
    });
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
        this.BufferSettings.controls.source_type.value,
        this.BufferSettings.controls.source_name.value, 
        this.BufferSettings.controls.acc_id.value, 
        this.BufferSettings.controls.mixed_sync_value.value, 
        this.BufferSettings.controls.full_sync.value,
        this.BufferSettings.controls.full_sync_allow_interval.value, 
        this.BufferSettings.controls.inc_sync.value,
        this.BufferSettings.controls.sync_interval.value, 
        this.BufferSettings.controls.sync_error_delay.value, 
        this.auth.currentUserValue.adm_user_id, 
        this.BufferSettings.controls.note.value
        ).subscribe((ret: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['editgroupphysbuff/' + ret.p_buffer_id]);
        }, (err: any) =>{ console.log(err); this.isLoadingResults = false;}

        );
    } else {

      this.api_service.editGroupedBufferPhysicalSettings(
        Number(this.buffer_id), 
        this.BufferSettings.controls.buffer_name.value, 
        this.BufferSettings.controls.buffer_type.value,
         this.BufferSettings.controls.source_type.value,
        this.BufferSettings.controls.source_name.value,
         this.BufferSettings.controls.acc_id.value, 
         this.BufferSettings.controls.mixed_sync_value.value, 
         this.BufferSettings.controls.full_sync.value,
         this.BufferSettings.controls.full_sync_allow_interval.value,
        this.BufferSettings.controls.inc_sync.value,
        this.BufferSettings.controls.sync_interval.value,
         this.BufferSettings.controls.sync_error_delay.value,
        this.BufferSettings.controls.blocked.value,
         this.auth.currentUserValue.adm_user_id, 
         this.BufferSettings.controls.note.value
        
         ).subscribe((ret: any) => {
          this.isLoadingResults = false;

        }, (err: any) =>{ console.log(err); this.isLoadingResults = false;}

        );

    }




  }

  check_avail_flds() {
    if (this.BufferSettings.controls.source_type.value === "3") {
      this.update_setting = false;
      this.BufferSettings.controls.source_name.clearValidators();
      this.BufferSettings.controls.source_name.setValue(null);
      this.BufferSettings.controls.acc_id.clearValidators();
      this.BufferSettings.controls.acc_id.setValue(null);
      this.BufferSettings.controls.sync_type.clearValidators();
      this.BufferSettings.controls.sync_type.setValue(null);
      this.BufferSettings.controls.full_sync.clearValidators();
      this.BufferSettings.controls.full_sync.setValue(null);
      //  this.BufferSettings.controls.full_sync_allow_interval.clearValidators();
      //   this.BufferSettings.controls.full_sync_allow_interval.setValue(null);
      this.BufferSettings.controls.inc_sync.clearValidators();
      this.BufferSettings.controls.inc_sync.setValue(null);
      this.BufferSettings.controls.sync_error_delay.clearValidators();
      this.BufferSettings.controls.sync_error_delay.setValue(null);
    } else {
      this.update_setting = true;
      this.BufferSettings.controls.acc_id.setValidators(Validators.required);
      this.BufferSettings.controls.full_sync.setValidators(Validators.required);
      this.BufferSettings.controls.sync_error_delay.setValidators(Validators.required);
      //Если указан тип синхронизации
      if (this.BufferSettings.controls.mixed_sync_value != null) {
        // Только инкрементальная
        if (this.BufferSettings.controls.sync_type.value < 0) {
          this.BufferSettings.controls.mixed_sync_value.setValue(-1) ;
          console.log(this.BufferSettings.controls.mixed_sync_value.value);
        
          this.BufferSettings.controls.inc_sync.enable();
          this.BufferSettings.controls.inc_sync.setValidators(Validators.required);
          this.BufferSettings.controls.sync_error_delay.enable();
          this.BufferSettings.controls.sync_error_delay.setValidators(Validators.required);

          this.BufferSettings.controls.full_sync.disable();
          this.BufferSettings.controls.full_sync.setValue(null);
          this.BufferSettings.controls.full_sync.clearValidators();
          this.BufferSettings.controls.full_sync_allow_interval.setValue(null);
          this.interval =false;
          this.mixed_sync_type = false;
          
         
        //  this.BufferSettings.controls.full_sync.setValue(null);
        }
        //Всегда полная
        if (this.BufferSettings.controls.sync_type.value == 0) {
          this.BufferSettings.controls.full_sync.setValidators(Validators.required);
          this.BufferSettings.controls.mixed_sync_value.setValue(0);

          
          
          this.BufferSettings.controls.full_sync.enable();
          this.BufferSettings.controls.text_allow_interval.enable();
          this.mixed_sync_type = false;
          this.interval =true;
          this.BufferSettings.controls.inc_sync.clearValidators();
          this.BufferSettings.controls.sync_error_delay.clearValidators();
          this.BufferSettings.controls.inc_sync.disable();
          this.BufferSettings.controls.sync_error_delay.disable();

          this.BufferSettings.controls.inc_sync.setValue(null) ;
          this.BufferSettings.controls.sync_error_delay.setValue(null);
          //this.BufferSettings.controls.inc_sync.setValue(null);
        }
        //Смешанная
        if (this.BufferSettings.controls.sync_type.value > 0) {
          this.interval =true;
          this.mixed_sync_type = true;
          this.sync_type=this.BufferSettings.controls.sync_type.value;
          this.BufferSettings.controls.full_sync.setValidators(Validators.required);
          this.BufferSettings.controls.full_sync_allow_interval.setValidators(Validators.required);
          this.BufferSettings.controls.inc_sync.setValidators(Validators.required);
          this.BufferSettings.controls.sync_error_delay.setValidators(Validators.required);
          this.BufferSettings.controls.full_sync.enable();
          this.BufferSettings.controls.full_sync_allow_interval.enable();
          this.BufferSettings.controls.inc_sync.enable();
          this.BufferSettings.controls.sync_error_delay.enable();
          
        //  this.BufferSettings.controls.inc_sync.enable();
        //  this.BufferSettings.controls.full_sync.enable();
        }
      }
    }
  }
}
  /*
    createNotUpdateForm() {
      // Пустая форма нужна в самом начале, чтоб форма прорисовалась пользователю и ничего не грзилось скорее всего из за того что у тебя не была формы 
      // при проверке в браузере жми f12 во вкладках выбери console там будут высвечиваться ошибки.
      this.BufferSettings = this.formBuilder.group({
        buffer_name: ['', Validators.compose([Validators.required])],
        buffer_type: ['', Validators.required],
        source_type: ['', Validators.required],
        source_name: [''],
        acc_id: [''],
        sync_type: [''],
        full_sync: [''],
        full_sync_allow_interval: [''],
        inc_sync: [''],
        sync_error_delay: [''],
        blocked: ['', Validators.required],
        blocked_date: [''],
        modified_date: [''],
        modified_account: ['',]
      });
  
      // нет никакой проверки нужно ли чемто заполнять или нет
      this.BufferSettings = this.formBuilder.group({
        buffer_name: [this.data.buffer_name, Validators.compose([Validators.required])],
        buffer_type: [this.data.buffer_type.toString(), Validators.required],
        source_type: [this.data.source_type.toString(), Validators.required],
        source_name: [this.data.source_name],
        acc_id: [this.data.acc_id,],
        sync_type: [this.data.sync_type,],
        full_sync: [this.data.full_sync,],
        full_sync_allow_interval: [this.data.full_sync_allow_interval],
        inc_sync: [this.data.inc_sync],
        sync_error_delay: [this.data.sync_error_delay],
        blocked: [this.data.blocked.toString(), Validators.required],
        blocked_date: [this.data.blocked_date,],
        modified_date: [this.data.modif_date,],
        modified_account: [this.data.modifed_by,]
  
      });
    }
  */
  

  /*
  // Можно менять значение,проверку и т.д. FormControl не обязательно новые создавать и в переменную перекидывать. Вместо этой процедуры сделаю avail_flds
    cng_update_setting() {
      if (this.data.source_type !== this.BufferSettings.controls.source_type.value)
        this.data.source_type = this.BufferSettings.controls.source_type.value;
  
      if (this.BufferSettings.controls.source_type.value === "3") {
        this.update_setting = false;
      //  this.createNotUpdateForm();
  
      }
      else {
        this.update_setting = true;
        this.createTypicalForm()
      }
  
    }*/
  /*
    getAdminInfo() {
      // Subscribe - подписка происходит асинхронно по этому у тебя может страница отобразится но данные ещё не подгрузились и тогда значение в select не выбирится
       // Задание на получение аккаунтов для обновления и acc_id это связка с таблицей accounts а не с admin_user
      this.api_service.getAdminsList().subscribe((admin: AdminList) => {
        setTimeout('6000');
        this.admins = admin.items;
      },
        (err: any) => console.log(err));
  
  
    }*/
  /*
    createTypicalForm() {
  
      this.admins.forEach(element => {
        if (element.adm_user_id === this.data.acc_id)
          this.data.acc_id = element.adm_user_id;
      });
      this.intervals = '';
     // Чтоб код был более компактным  лучше вынисти его в функции или процедуры или в файл или если гдето ещё нужно буде использовать то вынести в файл утилит например
     
      if (this.data.full_sync_allow_interval !== null) {
        
        let full_sync_allow_interval = this.data.full_sync_allow_interval.split('|');
        full_sync_allow_interval.forEach(element => {
          let interval_item = element.split('#');
  
          switch (interval_item[0]) {
            case '1':
              this.intervals += 'Понедельник' + ' ' + interval_item[1] + ';';
              break;
            case '2':
              this.intervals += 'Вторник' + ' ' + interval_item[1] + ';';
              break;
            case '3':
              this.intervals += 'Среда' + ' ' + interval_item[1] + ';';
              break;
            case '4':
              this.intervals += 'Четверг' + ' ' + interval_item[1] + ';';
              break;
            case '5':
              this.intervals += 'Пятница' + ' ' + interval_item[1] + ';';
              break;
            case '6':
              this.intervals += 'Суббота' + ' ' + interval_item[1] + ';';
              break;
            case '7':
              this.intervals += 'Воскресенье' + ' ' + interval_item[1] + ';';
              break;
          }
        });
  
        this.full_sync_allow_interval = this.intervals.split(';');
        this.full_sync_allow_interval.pop();
      }
      else {
        this.full_sync_allow_interval = [];
      }
  
  
      this.BufferSettings = this.formBuilder.group({
        buffer_name: [this.data.buffer_name, Validators.compose([Validators.required])],
        buffer_type: [this.data.buffer_type.toString(), Validators.required],
        source_type: [this.data.source_type.toString(), Validators.required],
        source_name: [this.data.source_name],
        acc_id: [this.data.acc_id,],
        sync_type: [this.data.sync_type.toString(), Validators.min(-1)],
        full_sync: [this.data.full_sync,],
        full_sync_allow_interval: [this.data.full_sync_allow_interval],
        inc_sync: [this.data.inc_sync],
        sync_error_delay: [this.data.sync_error_delay],
        blocked: [this.data.blocked.toString(), Validators.required],
        blocked_date: [this.data.blocked_date,],
        blocked_by: [this.data.blocked_by],
        modified_date: [this.data.modif_date,],
        modified_account: [this.data.modifed_by]
  
      });
  
  
    }
  // Тут можно сделать проще просто передавать строку и возвращаить строку а для отображения в норм виде использовать функцию из Utils
    editIntervals() {
      this.intervals_data = this.formBuilder.group({
        all_fields: [this.full_sync_allow_interval],
        delete_field: [],
        day: [''],
        first_time: [''],
        second_time: ['']
  
  
      });
      const dialogRef = this.dialog.open(FullsyncintervalsDialogComponent,
        {
          width: '600px',
          height: '600px',
          data: this.intervals_data
        });
  
      dialogRef.afterClosed().subscribe(result => {
  
        if (result === 'closed') {
  
        }
        else {
          console.log(result);
  
          if (result.all_fields)
            this.full_sync_allow_interval = result.all_fields;
          if ((result.day !== undefined) && (result.first_time !== undefined) && (result.second_time !== undefined)) {
            let interval = result.day + ' ' + result.first_time + '-' + result.second_time;
            this.full_sync_allow_interval.unshift(interval);
          }
          else {
  
          }
          this.interval_string = '';
          this.full_sync_allow_interval.forEach(element => {
            let sync_interval = element.split(' ');
            switch (sync_interval[0]) {
              case 'Понедельник':
                this.interval_string += '1' + '#' + sync_interval[1] + '|';
                break;
              case 'Вторник':
                this.interval_string += '2' + '#' + sync_interval[1] + '|';
                break;
              case 'Среда':
                this.interval_string += '3' + '#' + sync_interval[1] + '|';
                break;
              case 'Четверг':
                this.interval_string += '4' + '#' + sync_interval[1] + '|';
                break;
              case 'Пятница':
                this.interval_string += '5' + '#' + sync_interval[1] + '|';
                break;
              case 'Суббота':
                this.interval_string += '6' + '#' + sync_interval[1] + '|';
                break;
              case 'Воскресенье':
                this.interval_string += '7' + '#' + sync_interval[1] + '|';
                break;
            }
  
          });
          this.interval_string = this.interval_string.substring(0, this.interval_string.length - 1);
  
        }
  
      });
      /*
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
  
    }*/
  /*
    ngOnInit(): void {
  
      this.BufferSettings = this.formBuilder.group({
        buffer_name: ['', Validators.compose([Validators.required])],
        buffer_type: ['', Validators.required],
        source_type: ['', Validators.required],
        source_name: ['', Validators.required],
        acc_id: ['', Validators.required],
        sync_type: ['', Validators.required, Validators.min(-1)],
        full_sync: ['', Validators.required],
        full_sync_allow_interval: ['',],
        inc_sync: ['', Validators.required],
        sync_error_delay: ['', Validators.required],
        blocked: ['', Validators.required],
        blocked_date: [''],
        blocked_by: [''],
        modified_date: [''],
        modified_account: ['',]
  
      });
      // Subscribe - подписка происходит асинхронно по этому у тебя может страница отобразится но данные ещё не подгрузились и тогда значение в select не выбирится
       // Задание на получение аккаунтов для обновления и acc_id это связка с таблицей accounts а не с admin_user
      this.getAdminInfo();
      console.log(this.admins);
      this.buffer_id = this.route.snapshot.paramMap.get('buffer_id');
  
  
  
      if (this.buffer_id !== null) {
        this.api_service.getBuffSettings(this.buffer_id).subscribe((ret: GroupedBufferPhysicalSettingsResponse) => {
          console.log(ret.items[0]);
          this.data = ret.items[0];
  
  
          if (ret.items[0].source_type === 3) {
            this.update_setting = false;
            this.createNotUpdateForm();
          }
          else {
            this.update_setting = true;
            this.createTypicalForm();
          }
  
  
  
  
          if (ret.items[0].fld_cnt > 0) {
            this.fields = true;
            this.fld_cnt_color = "green"
          }
          else {
            this.fld_cnt_color = "red"
            this.fields = false;
          }
        //Вот аналогичная запись в одну строчку (условие) ? (если условие верно) : (иначе)  ret.items[0].acc_id!=null ? ret.items[0].acc_id.toString() : null
          /*if (ret.items[0].acc_id === null){ 
           ret.items[0].acc_id='';
          }*/
  /*
          if (ret.items[0].sync_type === null) {
            ret.items[0].sync_type = 0;
          }
  
  
  
          this.isLoadingResults = false;
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
  /*    }, (err: any) => console.log(err));

    }
    else {
      this.createTypicalForm();
    }
  }

*/
 


