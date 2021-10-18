import { ToursComponent } from './pages/tours/tours.component';
import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../core/material.module';
import { CreateTourComponent } from './pages/create-tour/create-tour.component';


@NgModule({
  declarations: [
    MainComponent,
    ToursComponent,
    CreateTourComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
