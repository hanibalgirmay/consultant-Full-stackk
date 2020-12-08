import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup ,FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { ClientServiceService } from '../../service/client-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public formReset: FormGroup;

  constructor(private userService: ClientServiceService,private toastr: ToastrService ) { }

  ngOnInit() {

    this.formReset = new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email,]),
    })
  }

  sendVerfication(formdata): void{
    if (this.formReset.dirty && this.formReset.valid){
      this.userService.forgot(this.formReset.value)
      .subscribe(data => {
        if (data.success === false) {
          this.toastr.error(data.message);
        } else {
          this.toastr.success(data.message);
          // this.router.navigate(['login']);
        }
        // this.registrationForm.reset();
    });
    }
  }

}
