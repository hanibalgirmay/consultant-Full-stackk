import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,NgForm,FormGroupDirective, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
// import { UserService } from '../user.service';

import { ToastrService } from 'ngx-toastr';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public adminLogin: FormGroup;
  serverErrorMessages: string;
  showSucessMessage: boolean;


    constructor(private userService: AuthService,
             private router: Router,
             private toastr: ToastrService ) { }

    ngOnInit() {
    	if(this.userService.isLoggedIn()){
        this.router.navigateByUrl('aau/admin/dashboard/partner/list');
      }
    	

      this.adminLogin = new FormGroup ({
         email: new FormControl('', [Validators.required, Validators.email,]),
         password: new FormControl('',Validators.required)
      });
    }
    public hasError = (controlName: string, errorName: string) => {
      return this.adminLogin.controls[controlName].hasError(errorName);
    }


    adminlogin(formdata:any): void{
      if (this.adminLogin.dirty && this.adminLogin.valid) {
        this.userService.login(this.adminLogin.value)
          .subscribe(data => {
            if(data.success === false) {
              this.toastr.error(data.message);
            } else {
              this.toastr.success('Login successful.');
              this.router.navigate(['aau/admin/dashboard/partner/list'])
            }
            this.adminLogin.reset();
          }); 
      }
  }

}
