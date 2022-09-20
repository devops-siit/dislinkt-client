import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/model/Account';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-follow-requests',
  templateUrl: './follow-requests.component.html',
  styleUrls: ['./follow-requests.component.scss']
})
export class FollowRequestsComponent implements OnInit {

  profiles: Account[] = []
  searchForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private accountsService: AccountsService,
  ) { }

  
  ngOnInit(): void {    
    this.accountsService.getFollowRequests().subscribe(
      res=>
      {
        this.profiles = res.body.content as Account[];
      }
    )
  }

  open_profile(uuid: any): void {
    console.log(uuid);
    this.router.navigate(['/profile/' + uuid]);
  }

  accept(uuid: any): void {
    this.accountsService.approveFollowRequest(uuid).subscribe(
      res=>{
        this.toastr.success("Follow request approved");
        window.location.reload();
      }
    )
  }

  decline(uuid: any): void {
    this.accountsService.declineFollowRequest(uuid).subscribe(
      res=>{
        this.toastr.success("Follow request declined")
      }
    )
  }

  }
  


