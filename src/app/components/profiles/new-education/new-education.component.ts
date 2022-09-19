import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ToastrService } from 'ngx-toastr';
import { DateRange } from 'src/app/model/DateRange';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-new-education',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.scss']
})
export class NewEducationComponent implements OnInit {

  eduForm!: FormGroup;
  result: any;
  todayDate!: Date;
  pipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewEducationComponent>,
    private accountService: AccountsService,
  ) {

    this.createForm();
  }

  ngOnInit(): void {
    this.todayDate = new Date();
  }
  createForm(): void {
    this.eduForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
       });
  }

  addEducation(): void {
    //"2021-10-10 00:00"
    let dateRange = {
      "startDate": String(this.pipe.transform(this.eduForm.value.startDate, 'yyyy-MM-dd HH:mm')),
      "endDate": String(this.pipe.transform(this.eduForm.value.endDate, 'yyyy-MM-dd HH:mm'))
    }

    let edu = {
      "name": this.eduForm.value.name,
      "title": this.eduForm.value.title,
      "description": this.eduForm.value.description,
      "duration": dateRange
    }
    console.log(edu)
    this.accountService.insertEducation(edu).subscribe(
      res=>{
        this.toastr.success("Successfull!");
        this.dialogRef.close(true);
      }, error =>{
        this.toastr.error("Error :(");
        this.dialogRef.close(false);
      }
    )
    
    //this.windowReload();
  }

  
  windowReload(): void{
    window.location.reload();
  }

}
