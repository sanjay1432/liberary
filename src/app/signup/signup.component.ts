import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router }      from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient,public router: Router) { }

  ngOnInit() {
  }
  onLogin(): void {
    this.router.navigate(['login']);
  }
  
  onSubmit(form: NgForm) {
    let body = form.value;
    body['isAdmin'] = true;
    
    this.http
    .post('/user', body)
    .subscribe(user => {console.log(user)}, error => {
      console.log(error.message); 
    });
  }
}
