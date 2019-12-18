import { DatabaseService } from './../../services/database.service';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  constructor(private validateServ: ValidateService,
              private flashMessage: FlashMessagesService,
              private databaseServ: DatabaseService,
              private router: Router ) { }

  ngOnInit() {
  }

  onSignup() {
  const user = {
    firstName: this.firstName,
    lastName: this.lastName,
    phone: this.phone,
    username: this.username,
    email: this.email,
    password: this.password
  };

  // Required fields
  if ( !this.validateServ.validateSignup(user)) {
   this.flashMessage.show('Please enter all fields', {cssClass: 'alert-danger', timeout: 3000});
   return false;
  }

  // Required fields
  if ( !this.validateServ.validateEmail(user.email)) {
    this.flashMessage.show('Please enter valid email', {cssClass: 'alert-danger', timeout: 3000});

    return false;
   }

   // Signup
  this.databaseServ.signUpUser(user).subscribe(data => {
    if ( data.success) {
      this.flashMessage.show('You are successfuly signed up!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/signin']);
    } else {
      this.flashMessage.show('Unable to signup, please try again!', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/signup']);
    }
  });

  }
}
