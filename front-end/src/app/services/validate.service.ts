import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() {
  }
   validateSignup(user) {
     // tslint:disable-next-line: triple-equals
     if ( user.firstName == undefined || user.lastName == undefined || user.phone == undefined ||
      // tslint:disable-next-line: triple-equals
      user.username == undefined || user.email == undefined || user.password == undefined) {
        return false;
     } else {
       return true;
     }
   }
   validateEmail(email) {
    // tslint:disable-next-line: max-line-length
    const  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
   }
  }
