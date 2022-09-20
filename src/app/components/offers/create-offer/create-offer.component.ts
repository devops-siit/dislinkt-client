import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OfferService } from 'src/app/services/offer-service/offer-service.service';



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
    private router: Router,
    private offersService: OfferService,
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
    this.offersService.createOffer(data).subscribe(
      res=>{
        this.toastr.success("Offer added")
        this.router.navigate(['/job-offers' ]);
      }, error=>{
        this.toastr.error("Cannot add offer :(")
        console.log(error)
      }
    )

  }

}
