import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router }      from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private location: Location,private http: HttpClient,public router: Router) { }

  ngOnInit() {
  }
  onLogin(): void {
    this.router.navigate(['login']);
  }
  goBack(){
    this.location.back();
}  
  onSubmit(form: NgForm) {
    let body = form.value;
    body['isAdmin'] = false;
    
    this.http
    .post('/user', body)
    .subscribe(user => {
      this.router.navigate(['home']);
    }, error => {
      console.log(error.message); 
    });
  }
}
