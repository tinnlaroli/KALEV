import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';


import { SharedModule } from './shared/shared.module';
import { UsersModule } from './features/users/users.module';

import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './landing/header/header.component';
import { ContentComponent } from './landing/content/content.component';
import { FooterComponent } from './landing/footer/footer.component';
import { LandingComponent } from './landing/landing/landing.component';
import { StudentsModule } from './features/students/students.module';
import { LoginComponent } from './auth/login/login.component';
import { GroupsModule } from './features/groups/groups.module';
import { ActivitiesModule } from './features/activities/activities.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    LandingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    UsersModule,
    HttpClientModule,
    StudentsModule,
    GroupsModule,
    ActivitiesModule, 
  ],
  exports: [
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
      
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }