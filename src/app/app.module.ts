import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';


=======
>>>>>>> 6f569052aa44dc041ac329549c8ee57fec813394

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule,
    BrowserAnimationsModule,
    //donde estan los modulos externos
    SharedModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
=======
    AppRoutingModule
  ],
  providers: [],
>>>>>>> 6f569052aa44dc041ac329549c8ee57fec813394
  bootstrap: [AppComponent]
})
export class AppModule { }
