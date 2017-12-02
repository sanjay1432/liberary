import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {FormGroup, AbstractControl, NgForm,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { window } from 'rxjs/operator/window';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  libId: any;
  selectedId: string;

  constructor(private location: Location, private route: ActivatedRoute,public router: Router,private http: HttpClient) { }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => 
      this.selectedId = params['liberaryid']
    );
    this.route.params.subscribe(params => {
      this.libId = params['id']; // --> Name must match wanted parameter
    });

  }
  goBack(){
    this.location.back();
  }  
  onSubmit(form: NgForm) {
    let body = form.value;
    
    body['libId'] = this.libId;   
    this.http
    .post('/book', body)
    .subscribe(book => {
      if(book != undefined){
           alert('you have added '+ book['bookTitle']+' Please refersh the page  to see  added book.')        
           }
           
    }, error => {
      console.log(error.message); 
    });
  }
}
