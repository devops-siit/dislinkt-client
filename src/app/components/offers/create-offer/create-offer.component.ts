import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';



@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  regForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() : void{
    this.regForm = this.fb.group({
      position: ['', Validators.required],
      description: ['',  Validators.required],
      prerequisites:['',  Validators.required]
      
    });
  }

  create(): void {
    
    let data = {
      position: this.regForm.get('position')?.value,
      description: this.regForm.get('description')?.value,
      prerequisites: this.regForm.get('prerequisites')?.value,
    }
    console.log(data)
    //

  }

}
