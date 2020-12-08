import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientServiceService } from '../../service/client-service.service';
import { ClientUser} from '../../../forms/model/clientUser';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  profileForm: FormGroup
  userObj: any;
  user: ClientUser;

  constructor(private fb: FormBuilder,
          private authService: ClientServiceService,
          private router: Router,
          private toastr: ToastrService) { }

  // firstname = new FormControl('', [Validators.required]);
  // lastname = new FormControl('', [Validators.required]);
  // email = new FormControl('', [Validators.email]);
  sex = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  directExpriance = new FormControl('', [Validators.required]);
  department = new FormControl('', [Validators.required]);
  commencing = new FormControl('', [Validators.required]);
  level = new FormControl('', [Validators.required]);
  middlename = new FormControl('', [Validators.required]);
  crt = new FormControl('', [Validators.required]);
  service = new FormControl('', [Validators.required]);
  independentExpriance = new FormControl('', [Validators.required]);
  eduaction = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.userObj = this.authService.currentUser;
    this.profileForm = this.fb.group({
      sex: this.sex,
      status:this.status,
      directExpriance:this.directExpriance,
      department:this.department,
      commencing:this.commencing,
      level:this.commencing,
      middlename:this.middlename,
      crt:this.crt,
      service:this.service,
      independentExpriance:this.independentExpriance,
      eduaction:this.eduaction
    });

    // this.authService.getUser(this.userObj.userid).subscribe(data => {
    //   if (data.success === false) {
    //     if (data.errcode){
    //       this.authService.logout();
    //       this.router.navigate(['login']);
    //     }
    //     this.toastr.error(data.message);
    //   } else {
    //     this.user = data.data[0];
    //     this.populateForm(this.user);
    //   }
    // });

    this.authService.getUserInfo(this.userObj.userid)
    .subscribe(data =>  {
      if(data.success === false) {
        if (data.errcode) {
          this.authService.logout();
          this.router.navigate(['login']);
        }
        this.toastr.error(data.message);
      } else {
        this.user = data[0];
        // this.dt = data[0];
        this.populateForm(this.user);
      }
    });
  }

  populateForm(data): void {
    this.profileForm.patchValue({
      sex: data.sex,
      status:data.status,
      directExpriance:data.directExpriance,
      department:data.department,
      commencing:data.commencing,
      level:data.commencing,
      middlename:data.middlename,
      crt:data.crt,
      service:data.service,
      independentExpriance:data.independentExpriance,
      eduaction:data.eduaction
    });
  }
  updateUser(formdata){
    if(this.profileForm.dirty && this.profileForm.valid){
      this.authService.updateUser(this.userObj.userid, this.profileForm.value)
        .subscribe(data => {
          if(data.success === false){
            if(data.errcode){
              this.authService.logout();
              this.router.navigate(['login']);
            }
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            let theUser:any = JSON.parse(localStorage.getItem('currentUser'));
            // theUser.user.firstname = this.profileForm.value.firstname;
            localStorage.setItem('currentUser', JSON.stringify(theUser));
            this.router.navigate(['user/profile']);
          }
        });
    }
  }

}
