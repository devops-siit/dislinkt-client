import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent implements OnInit {

  searchForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  profiles = [{"id": 1, "firstName": "Milica", "lastName": "Pavlovic", "username": "senorita", "private": false}, 
  {"id":2, "firstName": "Milica", "lastName": "Pavlovic", "username": "senorita2", "private": false}, 
  {"id": 3, "firstName": "Milica", "lastName": "Pavlovic", "username": "senorita3", "private": false},
  {"id": 4, "firstName": "Milica", "lastName": "Pavlovic", "username": "senorita3", "private": false}]

  ngOnInit(): void {
    this.createForm();
  }

  open_profile(id: any): void {
    console.log(id);
    this.router.navigate(['/profile/' + id]);
  }

  createForm() : void{
    this.searchForm = this.fb.group({
      name: ['']
    });
  }
  search(): void {

  }
  refresh(): void {
    
  }
}
