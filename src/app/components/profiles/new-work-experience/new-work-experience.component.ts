import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-new-work-experience',
  templateUrl: './new-work-experience.component.html',
  styleUrls: ['./new-work-experience.component.scss']
})
export class NewWorkExperienceComponent implements OnInit {

  expForm!: FormGroup;
  result: any;
  todayDate!: Date;
  pipe = new DatePipe('en-US');


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewWorkExperienceComponent>,
    private accountService: AccountsService,
  ) {

    this.createForm();
  }

  ngOnInit(): void {
    this.todayDate = new Date();
  }
  createForm(): void {
    this.expForm = this.fb.group({
      position: ['', Validators.required],
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
       });
  }

  addExperience(): void {
    //"2021-10-10 00:00"
    let dateRange = {
      "startDate": String(this.pipe.transform(this.expForm.value.startDate, 'yyyy-MM-dd HH:mm')),
      "endDate": String(this.pipe.transform(this.expForm.value.endDate, 'yyyy-MM-dd HH:mm'))
    }

    let exp = {
      "position": this.expForm.value.position,
      "companyName": this.expForm.value.companyName,
      "description": this.expForm.value.description,
      "duration": dateRange
    }

    this.accountService.insertWork(exp).subscribe(
      res=>{
        this.toastr.success("Successfull!");
        this.dialogRef.close(true);
      }, error =>{
        this.toastr.error("Error :(");
        this.dialogRef.close(false);
      }
    )

  }

  
  windowReload(): void{
    window.location.reload();
  }

}
