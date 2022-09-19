import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { ConfirmationComponent, ConfirmDialogModel } from '../../shared/confirmation/confirmation.component';
import { NewEducationComponent } from '../new-education/new-education.component';
import { NewWorkExperienceComponent } from '../new-work-experience/new-work-experience.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  todayDate!: Date;
  educations = [{"uuid": 1, "education": "gimnazija"}, {"uuid": 2, "education": "FTN"}];
  experiences = [{"uuid": 1, "experience": "web design"}, {"uuid": 2, "experience": "software developer"}];
  result: any

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private accountService: AccountsService,
  ) { }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.createForm();
    // get profile
    //TO DO
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
    //to do

  }

  removeEducation(uuid:any):void{
    const message = `Are you sure you want to remove education?`
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
        if (this.result === true){
          this.accountService.deleteEducation(uuid).subscribe(
            res=>{
              this.toastr.success('Experience successfully removed.');
              window.location.reload();
            },error=>{
              this.toastr.error('Cannot remove experience');
            });
        }
      })
  }
  addEducation():void {
    const dialogRef = this.dialog.open(NewEducationComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
        if (this.result === true){
          
          window.location.reload();
        }
      });
  }

  removeWorkExperience(uuid:any):void{
    const message = `Are you sure you want to remove work experience?`
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
        if (this.result === true){
          this.accountService.deleteWork(uuid).subscribe(
            res=>{
              this.toastr.success('Experience successfully removed.');
              window.location.reload();
            }, error=>{
                this.toastr.error('Cannot remove experience');

            });
          }
      })
  }
  addWorkExperience():void {
    const dialogRef = this.dialog.open(NewWorkExperienceComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
        if (this.result === true){
          
          window.location.reload();
        }
    });
  }

}
