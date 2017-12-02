import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppComponent } from './app.component';
import { LiberaryComponent } from './liberary/liberary.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule }     from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';

@NgModule({
  declarations: [
    AppComponent,
    LiberaryComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
