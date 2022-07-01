import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signOut(): void{
    // this.authenticationService.signOut().subscribe(
    //   result => {
    //       localStorage.removeItem('user');
    //       this.router.navigate(['/login']);
    //   }
    // );
  }
}
