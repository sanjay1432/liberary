import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, NgForm,FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute}      from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  libName: any;
  id: any;
  private authService:AuthService = null;
  constructor( private _activatedRoute: ActivatedRoute,public router: Router,auth:AuthService,private http: HttpClient) {
    this.authService = auth;
    _activatedRoute.queryParams.subscribe(
      params =>{ 
      this.id = params['id'];
    }
    );
   }

  ngOnInit() {
    let body = {id:this.id}
    this.http
    .post('/liberary/info', body)
    .subscribe(user => {
         if(user[0] != undefined){
      this.libName = 'to '+user[0].liberaryName;
         }
    }, error => {
      console.log(error.message); 
    });
  }
   
  onSignup(): void {
    this.router.navigate(['signup']);
  }
  public onSubmit(form: NgForm):void {
   console.log(form)
      this.authService.login(form.value.username,form.value.password)
            .subscribe(user => {
                  // Get the redirect URL from our auth service
                  // If no redirect has been set, use the default
                  if(user == true){
                 
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/liberary';
                    // Redirect the user
                    this.router.navigate([redirect+'id ='+this.id]);
                  }else if(user == false){
                    alert('Username/Password not matched!')
                  }
            }, error => {
              console.log(error.message); 
            });
     
  }
}
