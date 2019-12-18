import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
     private databaseServ: DatabaseService,
     private router: Router) {

  }

  canActivate() {
    if (this.databaseServ.signedIn()) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
