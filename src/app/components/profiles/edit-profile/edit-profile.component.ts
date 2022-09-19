import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/model/Account';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
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
  currentUser: any = {"uuid": "", "username": ""};
  todayDate!: Date;
  result: any;
  account: Account = {};
  pipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private accountService: AccountsService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.createForm();
    this.authService.validateToken().subscribe(
      res=>{
        this.currentUser = res.body;
        this.accountService.getAccountByUuid(this.currentUser.uuid).subscribe(
          res=>{
            this.account = res as Account;
            console.log(res)
            this.profileForm = this.fb.group({
              name: [this.account.name],
              username: [this.account.username],
              email:[this.account.email],
              phone:[this.account.phone],
              birthDate: [this.account.dateOfBirth],
              bio: [this.account.biography],
              gender: [this.account.gender],
              public: [this.account.isPublic],
              
               });
    
            this.profileForm.patchValue(this.account);
          }
        )
      }
    )
    
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
   
   
   let request = {
    "name": this.profileForm.value.name,
    "email": this.profileForm.value.email,
    "gender": this.profileForm.value.gender,
    "biography": this.profileForm.value.bio,
    "dateOfBirth": String(this.pipe.transform(this.profileForm.value.dateOfBirth, 'yyyy-MM-dd HH:mm')),
    "isPublic": this.profileForm.value.isPublic
   }
    this.accountService.editAccount(request).subscribe(
      res=>{
        this.toastr.success("Successfully edited account");
        console.log(res)
      }, error=>{
        this.toastr.error("Error :(");
      }
    )

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
