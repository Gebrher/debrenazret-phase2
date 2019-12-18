import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 username: string;
 password: string;
  constructor(
    private databaseServ: DatabaseService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
onSignin() {
  const user = {
    username: this.username,
    password: this.password
  };

  this.databaseServ.authenticate(user).subscribe(data => {
    if (data.success) {
        this.databaseServ.storeData(data.token, data.user);
        this.flashMessage.show('Signed in successfuly!',
          {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/dashboard']);
    } else {
      this.flashMessage.show(data.msg,
        {cssClass: 'alert-danger', timeout: 6000});
      this.router.navigate(['/login']);
    }
  });
}
}
