import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public databaseServ: DatabaseService,
    public router: Router,
    public flashMessage: FlashMessagesService) { }


  ngOnInit() {
  }

  onSignout() {
   this.databaseServ.signOut();
   this.flashMessage.show('You are signed out', {
     cssClass: 'alert-success',
     timeout: 3000
   } );
   this.router.navigate(['/signin']);
   return false;
  }
}
