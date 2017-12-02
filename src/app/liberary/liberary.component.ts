import { Component, OnInit } from '@angular/core';
import { AuthService }      from '../auth.service';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {FormGroup, AbstractControl, NgForm,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';
import { error } from 'util';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-liberary',
  templateUrl: './liberary.component.html',
  styleUrls: ['./liberary.component.css']
})
export class LiberaryComponent implements OnInit {
  liberaries: any;
  issued: boolean;
  userId: any;
  books: any;
  isLib: boolean = false;
  liberaryId: any;
  admin: boolean;
  count:number = 0;

  constructor(private location: Location,private route: ActivatedRoute,public authService: AuthService, public router: Router,private http: HttpClient) { 
   

  }

  ngOnInit() {

   
   let loggedUser=  JSON.parse(localStorage.getItem('currentUser'));
   this.admin= loggedUser.userinfo.isAdmin;
   this.userId= loggedUser.userinfo._id;
   this.route.params.subscribe(params => {
    this.liberaryId = params['id']; // --> Name must match wanted parameter
  });
  if(this.liberaryId != undefined){
    this.isLib = true;
  }
  
 let body = {id:this.liberaryId};
    this.http
      .post('/book/info', body)
      .subscribe(book => {
       if(book){ 
        var issued = book[0].issuedTo;
        if(issued.indexOf(this.userId) !=-1){
          this.issued = true;
        }
        this.books = book;
      }
      }, error => {
        console.log(error.message); 
    });

    this.http.get('/liberary').subscribe(liberary=>{
                  
      this.liberaries = liberary;
    },error=>{console.log(error.message); })
  }
  onSubmit(form: NgForm) {
    let body = form.value;   
     let that = this; 
    this.http
    .post('/liberary', body)
    .subscribe(lib => {
      if(lib != undefined){
        that.router.navigate(['/books', { liberaryid: lib['_id']}]);
           }
    }, error => {
      console.log(error.message); 
    });
  }

  goBack(){
    this.location.back();
  }  
  onIssue(event) {

    event['userId'] =  this.userId;
    this.http
    .post('/book/issue', event)
    .subscribe(issued => {
      this.issued = issued['issued'];
      this.count = -1;
      // this.books = book;
    }, error => {
      console.log(error.message); 
    });
  }
  onReturn(event) {

    event['userId'] =  this.userId;
    this.http
    .post('/book/return', event)
    .subscribe(returned => {
      this.issued = returned['issued'];
      this.count = +1;
      // this.books = book;
    }, error => {
      console.log(error.message); 
    });
  }
  onRemove(event){
    event['userId'] =  this.userId;
    this.http
    .post('/book/remove', event)
    .subscribe(removed => {
      window.location.reload();
    }, error => {
      console.log(error.message); 
    });

  }
  onRemoveLiberary(event){
    this.http
    .post('/liberary/remove', event)
    .subscribe(removed => {
      window.location.reload();
    }, error => {
      console.log(error.message); 
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
