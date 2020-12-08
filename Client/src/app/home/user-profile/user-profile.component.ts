import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { ClientServiceService } from '../service/client-service.service';
import { ClientUser } from '../../forms/model/clientUser';
import {ErrorStateMatcher} from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public validationForm: FormGroup;
  profileForm: FormGroup
  userObj: any;
  user: ClientUser;
  dt :any =[];

  constructor(private userService: ClientServiceService, 
              private router: Router,
              private toastr: ToastrService,
  				        private activeRoute: ActivatedRoute,
  				        private fb: FormBuilder) { }

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  img = new FormControl('', Validators.required);

  ngOnInit() {
  	this.userObj = this.userService.currentUser;
   this.profileForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    });

  this.userService.getUser(this.userObj.userid)
    .subscribe(data => {
      if(data.success == false) {
        if (data.errcode) {
          this.userService.logout();
          this.router.navigate(['login']);
        }
        this.toastr.error(data.message);
      } else {
        this.user = data.data[0];
        // this.dt = data[0];
        this.populateForm(this.user);
      }
    })

   this.userService.getUserInfo(this.userObj.userid)
    .subscribe(data =>  {
      if(data.success === false) {
        if (data.errcode) {
          this.userService.logout();
          this.router.navigate(['login']);
        }
        this.toastr.error(data.message);
      } else {
        // this.user = data.data[0];
        this.dt = data[0];
        // this.populateForm(this.user);
      }
    });

  }

  populateForm(data): void {
    this.profileForm.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    });
  }



  updateUser(){
    if(this.profileForm.dirty && this.profileForm.valid){
      this.userService.updateUser(this.userObj.userid, this.profileForm.value)
        .subscribe(data => {
          if(data.success === false){
            if(data.errcode){
              this.userService.logout();
              this.router.navigate(['login']);
            }
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            let theUser:any = JSON.parse(localStorage.getItem('currentUser'));
            theUser.user.firstname = this.profileForm.value.firstname;
            localStorage.setItem('currentUser', JSON.stringify(theUser));
          }
        });
    }
  }

}
