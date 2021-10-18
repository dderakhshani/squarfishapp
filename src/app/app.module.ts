import { AuthModule } from './auth/auth.module';
import { PortalModule } from './portal/portal.module';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';
import { JwtInterceptor } from './core/interceptors/jwt-interceptor ';
import { GlobalService } from './core/services/global.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './core/material.module';
import { WaitingDialogComponent } from './components/waiting-dialog/waiting-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WaitingDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MaterialModule
  ],
  providers: [

    GlobalService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
