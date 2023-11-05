import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobportalService } from '../jobportal.service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: JobportalService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      userType: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let user = new User();
      user.FirstName = form.value.firstName;
      user.LastName = form.value.lastName;
      user.Email = form.value.email;
      user.Password = form.value.password;
      user.UserType = form.value.userType;
      user.Phone = form.value.phone;
      this.service.setUser(user).subscribe((result: any) => {
        console.log("Account Created Successfully");
      })
    }
  }
}

