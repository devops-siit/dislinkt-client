import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/model/Account';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-public-profiles',
  templateUrl: './public-profiles.component.html',
  styleUrls: ['./public-profiles.component.scss']
})
export class PublicProfilesComponent implements OnInit {

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
    this.createForm();
    // page num, page size
    this.accountsService.getAllAccounts(0, 5).subscribe(
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

  createForm() : void{
    this.searchForm = this.fb.group({
      name: ['']
    });
  }
  search(): void {
    if(this.searchForm.value.name != "") {
      this.accountsService.searchAccounts(this.searchForm.value.name,0, 5).subscribe(
        res=>{
          this.profiles = res.body.content as Account[];
        }
      )
    }
  }
  refresh(): void {
    this.accountsService.getAllAccounts(0, 5).subscribe(
      res=>
      {
        this.profiles = res.body.content as Account[];
      }
    )
  }
}
