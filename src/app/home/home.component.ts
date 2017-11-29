import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  results: any;

  constructor(public router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/liberary').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
    });
  }
  lib() {
    this.router.navigate(['/login']);
  }
} 
