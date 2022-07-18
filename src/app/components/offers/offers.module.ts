import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOffersComponent } from './all-offers/all-offers.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material-module';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';



 
@NgModule({
  declarations: [
    AllOffersComponent
  ],
  imports: [
    CommonModule,  MatDialogModule, MaterialModule, MatCardModule, BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule
  ]
})
export class OffersModule { }
