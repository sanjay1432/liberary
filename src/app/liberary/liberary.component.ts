import { Component, OnInit } from '@angular/core';
import { AuthService }      from '../auth.service';
import { Router,NavigationExtras } from '@angular/router';
import {FormGroup, AbstractControl, NgForm,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-liberary',
  templateUrl: './liberary.component.html',
  styleUrls: ['./liberary.component.css']
})
export class LiberaryComponent implements OnInit {
  user: boolean;

  constructor(public authService: AuthService, public router: Router,private http: HttpClient) { }

  ngOnInit() {
   let loggedUser=  JSON.parse(localStorage.getItem('currentUser'));
   this.user= loggedUser.userinfo.isAdmin;
  }
  onSubmit(form: NgForm) {
    let body = form.value;    
    this.http
    .post('/liberary', body)
    .subscribe(lib => {}, error => {
      console.log(error.message); 
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
