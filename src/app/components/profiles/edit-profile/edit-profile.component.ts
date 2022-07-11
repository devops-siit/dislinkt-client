import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent, ConfirmDialogModel } from '../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  todayDate!: Date;
  educations = [{"id": 1, "education": "gimnazija"}, {"id": 2, "education": "FTN"}];
  experiences = [{"id": 1, "experience": "web design"}, {"id": 2, "experience": "software developer"}];
  result: any

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.createForm();
  }

  createForm() : void{
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      username: ['',  Validators.required],
      email:['',  Validators.required],
      phone:['',  Validators.required],
      birthDate: [''],
      bio: [''],
      gender: [''],
      public: ['']
      
    });
  }

  saveProfileData(): void {
  
  }

  removeEducation(id:any):void{
    const message = `Are you sure you want to remove education?`
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
        if (this.result === true){
          // this.profileService.deleteEducation(id).subscribe(
          //   result => {
          //     this.toastr.success('Experience successfully removed.');
          //     window.location.reload();
          //   }, error => {
          //     this.toastr.error('Cannot remove experience');
      
          //   }
          // );

          }
      })
  }
  addEducation():void {

  }
  removeWorkExperience(id:any):void{
    const message = `Are you sure you want to remove work experience?`
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
        if (this.result === true){
          // this.profileService.deleteExperience(id).subscribe(
          //   result => {
          //     this.toastr.success('Experience successfully removed.');
          //     window.location.reload();
          //   }, error => {
          //     this.toastr.error('Cannot remove experience');
      
          //   }
          // );

          }
      })
  }
  addWorkExperience():void {
    
  }

}
