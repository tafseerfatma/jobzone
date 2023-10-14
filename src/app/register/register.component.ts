import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormControl('')
 
    user = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  
    onSubmit() {
    
    
    console.log('Register button clicked.');
    console.log('User registration data:', this.user);

  
  }
}

