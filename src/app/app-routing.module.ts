import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployersComponent } from './employers/employers.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { SupportComponent } from './support/support.component';
import { SearchCandidatesComponent } from './search-candidates/search-candidates.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { PostJobsComponent } from './post-jobs/post-jobs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'employers', component: EmployersComponent},
  { path: 'searchjobs', component: SearchJobsComponent},
  { path: 'support', component: SupportComponent},
  { path: 'searchcandidates', component: SearchCandidatesComponent},
  { path: 'viewprofile', component: ViewProfileComponent},
  { path: 'postjobs', component: PostJobsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 

 }


 
