import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-serv-fields-dialog',
  templateUrl: './serv-fields-dialog.component.html',
  styleUrls: ['./serv-fields-dialog.component.css']
})
export class ServFieldsDialogComponent implements OnInit {
  
  error = '';
  serv_id :string;
  

  constructor(
    public dialogRef: MatDialogRef<ServFieldsDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
    ) 
    {
      this.serv_id= this.data.value.service_id;
    }

  onCancleClick(): void {
    this.dialogRef.close(null);
  }
  ngOnInit(): void {
      console.log(this.data);
  }

  onSubmit(data: FormGroup){
    if(!data.invalid)
    this.dialogRef.close(data);
  }
}
