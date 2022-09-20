import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/model/Account';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { ConfirmationComponent, ConfirmDialogModel } from '../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-blocked-accounts',
  templateUrl: './blocked-accounts.component.html',
  styleUrls: ['./blocked-accounts.component.scss']
})
export class BlockedAccountsComponent implements OnInit {


  profiles: Account[] = [];
  result: any;

  constructor(
    
    public dialog: MatDialog,
    private accountService: AccountsService,
  ) { }

  ngOnInit(): void {
    this.accountService.getBlockedAccounts().subscribe(
      res=>{
        this.profiles = res as Account[];
      }
    )
  }



  unblock(uuid: any): void {
    const message = `Are you sure you want to unblock the user?`
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationComponent, {
        maxWidth: '400px',
        data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
        if (this.result === true){
          this.accountService.unblockAccount(uuid).subscribe(
            res=> {
              window.location.reload();
            }
          )
          
          }
      })
    }

}
