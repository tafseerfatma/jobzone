import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EmployersComponent } from './employers/employers.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { SupportComponent } from './support/support.component';
import { SearchCandidatesComponent } from './search-candidates/search-candidates.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { PostJobsComponent } from './post-jobs/post-jobs.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    EmployersComponent,
    SearchJobsComponent,
    SupportComponent,
    SearchCandidatesComponent,
    ViewProfileComponent,
    PostJobsComponent,
     
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
