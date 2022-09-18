import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Offer } from 'src/app/model/Offer';
import { OfferService } from 'src/app/services/offer-service/offer-service.service';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.scss']
})
export class AllOffersComponent implements OnInit, OnChanges {
  length = 100; //totalElements
  pageSize = 10;
   // MatPaginator Output
  pageEvent: PageEvent | undefined;

  offers: Offer[] | undefined ;

  constructor(private offerService: OfferService) { }

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
    console.log("on change")
    console.log(this.pageEvent)
  }

  ngOnInit(): void {
    this.showAllOffers()
  }

  showAllOffers(){
    this.offerService.getAllByPage().subscribe((data) =>{
        
      this.offers = data?.body?.content;
      });
  }


  }



