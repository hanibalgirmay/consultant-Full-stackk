import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ClientUser } from '../../forms/model/clientUser';
import { map,tap,catchError} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

function comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('retypepass');

  if(passwordControl.pristine || confirmControl.pristine) {
    return null;
  }
  if(passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'mismatchedPassword': true };
}

@Component({
  selector: 'app-user-passsword',
  templateUrl: './user-passsword.component.html',
  styleUrls: ['./user-passsword.component.css'],
  providers:[ToastrService]
})
export class UserPassswordComponent implements OnInit {
  passwordForm: FormGroup;
  userObj: any;

  constructor(private fb: FormBuilder,
          private userService: ClientServiceService,
          private toastr: ToastrService,
  				private router: Router) { }

  oldpassword = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')]);
  retypepass = new FormControl('', [Validators.required]);

  ngOnInit() {
  	this.userObj = this.userService.currentUser;
    this.passwordForm = this.fb.group({
      oldpassword: this.oldpassword,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      }, {validator: comparePassword})
    });
  }

  updatePassword(formdata):void{
      if(this.passwordForm.dirty && this.passwordForm.valid) {
        let theForm = this.passwordForm.value;
        const thePass = this.passwordForm.value.passwordGroup.password;
        theForm.password = thePass;
        delete theForm.passwordGroup;

        this.userService.updatePassword(this.userObj.userid,theForm)
          .subscribe(data => {
            if(data.success === false){
              if(data.errcode){
                this.userService.logout();
                this.router.navigate(['login']);
              }
              this.toastr.error(data.message);
            } else {
              this.toastr.success(data.message);
            }
            this.passwordForm.reset();
          });
      }
    }

}
