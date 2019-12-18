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
