import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grphys-buff-dialog',
  templateUrl: './grphys-buff-dialog.component.html',
  styleUrls: ['./grphys-buff-dialog.component.css']
})
export class GrphysBuffDialogComponent implements OnInit {

  error = '';
  buffer_id :string;

  constructor(
    public dialogRef: MatDialogRef<GrphysBuffDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  ) {
    this.buffer_id= this.data.value.buffer_id;
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
