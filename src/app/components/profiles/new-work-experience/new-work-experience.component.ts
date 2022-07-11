import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-work-experience',
  templateUrl: './new-work-experience.component.html',
  styleUrls: ['./new-work-experience.component.scss']
})
export class NewWorkExperienceComponent implements OnInit {

  expForm!: FormGroup;
  result: any

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewWorkExperienceComponent>
  ) {

    this.createForm();
  }

  ngOnInit(): void {
    
  }
  createForm(): void {
    this.expForm = this.fb.group({
      experience: ['', Validators.required],
       });
  }

  addExperience(): void {
    this.dialogRef.close();
    this.windowReload();
  }

  
  windowReload(): void{
    window.location.reload();
  }

}
