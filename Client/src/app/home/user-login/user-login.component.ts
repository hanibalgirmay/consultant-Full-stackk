import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup ,FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { ClientServiceService } from '../service/client-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers:[ToastrService]
})
export class UserLoginComponent implements OnInit {
	hide = true;
  public formLogin: FormGroup;
  serverErrorMessages: string;
  showSucessMessage: boolean;

  constructor(private authService: ClientServiceService,
             private router: Router,
             private toastr: ToastrService ) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
        this.router.navigateByUrl('user/dashboard');
      }

     this.formLogin = new FormGroup ({
       email: new FormControl('', [Validators.required, Validators.email,]),
       password: new FormControl('',Validators.required)
    });
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  public hasError = (controlName: string, errorName: string) => {
      return this.formLogin.controls[controlName].hasError(errorName);
  }

  Userlogin(fomdata): void{
      if (this.formLogin.dirty && this.formLogin.valid) {
        this.authService.login(this.formLogin.value)
            .subscribe(data => {
              if(data.success === false) {
                this.toastr.error(data.message, 'error');
              } else {
                this.toastr.success('Login successful.', 'enjoy');
                this.router.navigate(['form']);
              }
              this.formLogin.reset();
            });     
    }
  }

}
