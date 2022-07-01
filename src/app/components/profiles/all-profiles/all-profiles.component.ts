import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  profiles = [{"id": 1, "firstName": "Milica", "lastName": "Pavlovic", "username": "senorita", "private": false}, 
  {"id":2, "firstName": "Milica", "lastName": "Pavlovic", "username": "senorita2", "private": false}, 
  {"id": 3, "firstName": "Milica", "lastName": "Pavlovic", "username": "senorita3", "private": false}]

  ngOnInit(): void {
    
  }

  open_profile(id: any): void {
    console.log(id);
    this.router.navigate(['/profile/' + id]);
  }

}
