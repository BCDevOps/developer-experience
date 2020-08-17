import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/shared/header/header.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { OutofServicePageComponent } from './outof-service-page/outof-service-page.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UnauthorizedPageComponent,
    OutofServicePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
