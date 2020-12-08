import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service;'
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { UserService } from '../../user.service';
import { User } from '../../services/user';
import { ToastrService} from 'ngx-toastr'
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  userDetails;
  profileForm: FormGroup;
  userObj: any;
  user: User;

  constructor(private userService: AuthService, private toastr: ToastrService, private adminService: UserService,private fb: FormBuilder, private router: Router) { }

  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);

  ngOnInit() {
    this.userObj = this.userService.currentUser;
    this.profileForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    });

    this.adminService.getUser(this.userObj.userid).subscribe(data => {
      if (data.success === false) {
        if (data.errcode){
          this.userService.logout();
          this.router.navigate(['aau/admin/login']);
        }
        this.toastr.error(data.message);
      } else {
        this.user = data.data[0];
        this.populateForm(this.user);
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

  updateUser(formdata){
    if(this.profileForm.dirty && this.profileForm.valid){
      this.adminService.updateUser(this.userObj.userid, this.profileForm.value)
        .subscribe(data => {
          if(data.success === false){
            if(data.errcode){
              this.userService.logout();
              this.router.navigate(['aau/admin/login']);
            }
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            let theUser:any = JSON.parse(localStorage.getItem('adminUser'));
            theUser.user.firstname = this.profileForm.value.firstname;
            localStorage.setItem('adminUser', JSON.stringify(theUser));
            this.router.navigate(['admin/profile']);
          }
        });
    }
  }

  onLogout(){
    // this.userService.deleteToken();
    this.router.navigate(['/aau/admin/login']);
  }

}
