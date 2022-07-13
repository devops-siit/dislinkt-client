import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent, ConfirmDialogModel } from '../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-blocked-accounts',
  templateUrl: './blocked-accounts.component.html',
  styleUrls: ['./blocked-accounts.component.scss']
})
export class BlockedAccountsComponent implements OnInit {


  profiles = [{"id": 9, "firstName": "Marija", "lastName": "Petrovic", "username": "mara", "private": false}, 
  {"id":8, "firstName": "Marija", "lastName": "Petrovic", "username": "mara2", "private": false}, 
  {"id": 7, "firstName": "Marija", "lastName": "Petrovic", "username": "mara3", "private": false},
  {"id": 6, "firstName": "Marija", "lastName": "Petrovic", "username": "mara3", "private": false}]
  result: any;

  constructor(
    
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

 

 

  unblock(): void {
    const message = `Are you sure you want to unblock the user?`
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });

    //TODO: pozovi servis metodu
   
  }

}
