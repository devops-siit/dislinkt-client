import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-education',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.scss']
})
export class NewEducationComponent implements OnInit {

  eduForm!: FormGroup;
  result: any

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewEducationComponent>
  ) {

    this.createForm();
  }

  ngOnInit(): void {
    
  }
  createForm(): void {
    this.eduForm = this.fb.group({
      education: ['', Validators.required],
       });
  }

  addEducation(): void {
    this.dialogRef.close();
    this.windowReload();
  }

  
  windowReload(): void{
    window.location.reload();
  }

}
