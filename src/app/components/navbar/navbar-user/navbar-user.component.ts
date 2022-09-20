import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/Account';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  isPublic: boolean = false;
  user!: Account; 
  constructor(private authenticationService: AuthenticationService,
    private accountService: AccountsService,
    private router: Router) { }


  ngOnInit(): void {
    this.authenticationService.validateToken().subscribe(
      res=>{
        this.user = res.body as Account;
        this.accountService.getAccountByUuid(this.user.uuid).subscribe(
          res=>{
            this.user = res as Account;
            console.log("auth")
            console.log(this.user)
            this.isPublic = this.user.isPublic? true: false;
          }
        )
        
      }
    )
  }


  signOut(): void{
    
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
     
  }

}
