import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineAll } from 'rxjs/operators';
import { Utils } from '../utils';

@Component({
  selector: 'app-fullsyncintervals-dialog',
  templateUrl: './fullsyncintervals-dialog.component.html',
  styleUrls: ['./fullsyncintervals-dialog.component.css']
})
export class FullsyncintervalsDialogComponent implements OnInit {

  error = '';
  delete_interval: string;
  new_interval : FormGroup;
  all_intervals: any[2][]=[];
  constructor(
    public dialogRef: MatDialogRef<FullsyncintervalsDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    // this.buffer_id= this.data.value.buffer_id;
  }

 
  ngOnInit(): void {
    this.new_interval = this.formBuilder.group({
      day: ['',Validators.required],
      first_time: ['',Validators.required],
      second_time: ['',Validators.required]
    });
    if (this.data != null && this.data.length > 0) {
    this.data.split('|').forEach(element => {
      this.all_intervals.push( {code : element, decode : Utils.decodeInterval(element)});
    });
  }
  }
  remove(intr): void {
    const index = this.all_intervals.indexOf(intr);

    if (index >= 0) {
      this.all_intervals.splice(index, 1);
    }
  }
 /* deleteIntrvl() {
    console.log(this.delete_interval);
    let index = this.data.value.all_fields.indexOf(this.delete_interval);
    this.data.value.all_fields.splice(index, 1);
    this.dialogRef.close(this.data);
  }*/
  onSubmit() {
    if(!this.new_interval.valid) return;
    let res =this.new_interval.value['day']+'#'+this.new_interval.value['first_time']+'-'+this.new_interval.value['second_time'];
    
    this.all_intervals.push( {code : res, decode : Utils.decodeInterval(res)});
    this.new_interval.controls.day.setValue(null);
    this.new_interval.controls.first_time.setValue(null);
    this.new_interval.controls.second_time.setValue(null);
    /*
    console.log(this.new_interval);
    if ((data.value.day !== '') && (data.value.first_time !== '') && (data.value.second_time !== '')) {

      this.dialogRef.close(data.value);
    }
*/
    //this.dialogRef.close(data);
  }
  commit(){
    this.data='';
    this.all_intervals.forEach(e=>{
      if(this.data.length>0)
      this.data+='|'+e['code'];
      else this.data+=e['code'];
    })
    this.dialogRef.close(this.data);
  }
  onCancleClick(): void {
    this.dialogRef.close(null);
  }
}
