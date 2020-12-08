import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective,NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';
import { ToastrService } from 'ngx-toastr';
import {ErrorStateMatcher} from '@angular/material';
import { FileSelectDirective, FileUploadModule, FileUploader} from 'ng2-file-upload';
import { PasswordValidation } from './password-validator';

const url = 'http://localhost:2011';
/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {
  isOptional = false;
  attachList :any = [];
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService:ClientServiceService,
              private toastr: ToastrService ) { }

  public uploader:FileUploader = new FileUploader({url: url});

  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')]);
  confirmPassword = new FormControl('', [Validators.required]);
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  
  email = new FormControl('', Validators.required);
  // service = new FormControl('', Validators.required);
  minPw = 8;
  public registrationForm: FormGroup;

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstname:['', Validators.required],
      lastname: ['', Validators.required],
      email:['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
      }, {validator: PasswordValidation.MatchPassword})
    }
  // }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  da(){
    console.log(this.registrationForm.value);
  }

  UserRegister(formdata:any): void {
    console.log(formdata);
    if (this.registrationForm.dirty && this.registrationForm.valid ) {
      let theForm = this.registrationForm.value;
      const thePass = this.registrationForm.value.password;
      theForm.password = thePass;
      // delete theForm.passwordGroup;
      console.log(theForm);
      this.userService.register(theForm)
        .subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.registrationForm.reset();
            this.router.navigate(['form']);
          }
          
      });
    }
  }

}
