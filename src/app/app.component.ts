import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobportalService } from './jobportal.service';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
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
//  class InputComponent {

//   add():number{
//     return 1 + 1
//   }
// }

// class Example {
//   public input: typeof InputComponent;

//   constructor(Input: typeof InputComponent) {
//     this.input = new Input();
//   }
// }

// class Example2 {
//   public input: typeof InputComponent;

//   constructor(Input: typeof InputComponent = InputComponent) {
//     this.input = new Input();
//   }
//}
  

  