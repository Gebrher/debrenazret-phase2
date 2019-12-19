import { DatabaseService } from './../../services/database.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   user = {
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    password: ''
  };
  constructor(private validateServ: ValidateService,
              private flashMessage: FlashMessagesService,
              private databaseServ: DatabaseService,
              private router: Router ) { }


  ngOnInit() {
    this.databaseServ.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    }
    );
  }

  onUpdateProfile() {
  const user = this.user;

  // Required fields
  if ( !this.validateServ.validateUpdate(user)) {
    this.flashMessage.show('Please enter all fields', {cssClass: 'alert-danger', timeout: 3000});
    return false;
   }

   // Required fields
  if ( !this.validateServ.validateEmail(user.email)) {
     this.flashMessage.show('Please enter valid email', {cssClass: 'alert-danger', timeout: 3000});

     return false;
    }

  this.databaseServ.updateProfile(user).subscribe(data => {
        if (data.success) {
            this.databaseServ.signOut();
            this.flashMessage.show(data.msg,
             {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/signin']);
        } else {
          this.flashMessage.show(data.msg,
           {cssClass: 'alert-danger', timeout: 6000});
          this.router.navigate(['/signin']);
        }
      });

  }

  deleteProfile() {
      if (confirm('Are you sure to delete your profile ?')) {
    this.databaseServ.deleteProfile().subscribe(data => {
      if (data.success) {
                  this.databaseServ.signOut();
                  this.flashMessage.show(data.msg,
                    {cssClass: 'alert-success', timeout: 3000});
                  this.router.navigate(['/']);
              } else {
                this.flashMessage.show(data.msg,
                  {cssClass: 'alert-danger', timeout: 6000});
                this.router.navigate(['/signin']);
              }
    });


  }

}

}
