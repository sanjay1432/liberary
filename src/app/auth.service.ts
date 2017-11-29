import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
@Injectable()
export class AuthService {
  
  constructor(private http: Http) { }
  isLoggedIn = false;
  validLogin:boolean;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: String, password: String) {
    return this.http.post('/user/authenticate',{ username: username, password: password })
    .map((response: Response) => {
           console.log('at auth : '+response.json())
           let user = response.json();
           localStorage.setItem('currentUser', JSON.stringify(user));

           if(user.token == false){ 
            return  this.validLogin = false;
       }
       else if(user.userinfo.activated==false){
         return user;
       }else{
         return  this.validLogin = true;
       }
          
    });
  }

  logout(): void {
    this.validLogin = false;
    localStorage.removeItem('currentUser');
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/