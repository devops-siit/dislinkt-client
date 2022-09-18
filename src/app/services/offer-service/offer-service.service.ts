import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/model/Offer';
import { Page } from 'src/app/model/Page';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private readonly path = 'http://localhost:8083/offers';
  pageSize :number = 0;


  constructor(private http: HttpClient) { }

  getAllByPage(page : number = 0) : Observable<HttpResponse<Page<Offer>>>{
    const params = new HttpParams().set('page',page.toString()).set("size",this.pageSize.toString());
    return this.http.get<Page<Offer>>(this.path , { observe : 'response'});
  }

  createOffer(offer:Offer): Observable<HttpResponse<Offer>>{

    return this.http.post<Offer>(this.path, offer, {observe: 'response'})
  }


}
