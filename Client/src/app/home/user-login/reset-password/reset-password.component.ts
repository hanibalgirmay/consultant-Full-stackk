import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup ,FormGroupDirective, AbstractControl, Validators, FormBuilder} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { ClientServiceService } from '../../service/client-service.service';
import { ToastrService } from 'ngx-toastr';

function comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('retypepass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
      return null;
  }
  return { 'mismatchedPassword': true };
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private userService: ClientServiceService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService ) { }

  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')]);
  retypepass = new FormControl('', [Validators.required]);

  ngOnInit() {

    this.resetForm = this.fb.group({
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      }, {validator: comparePassword})
    })
  }

  resetPassword(formdata): void{
    let token: string = this.activeRoute.snapshot.params['token'];
    if (this.resetForm.dirty && this.resetForm.valid){
      let theForm = this.resetForm.value;
      const thePass = this.resetForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;
      this.userService.reset(theForm, token)
      .subscribe(data => {
        if (data.success === false) {
          this.toastr.error(data.message);
        } else {
          this.toastr.success(data.message);
          this.router.navigate(['login']);
        }
        // this.registrationForm.reset();
    });
    }
  }

}
