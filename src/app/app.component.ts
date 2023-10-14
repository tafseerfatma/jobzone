import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'job-portal-client';
  userType:string = 'none';
  constructor( private router: Router){
    
  }
  public navigateRegister(){
    this.router.navigate(['/register']);
  }

  public navigateLogin(){
    this.router.navigate(['/login']);
  }
}
 
  

  