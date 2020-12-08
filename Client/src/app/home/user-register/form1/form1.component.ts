import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientServiceService } from '../../service/client-service.service';
import { ClientUser } from '../../../forms/model/clientUser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component  implements OnInit{

  public FormRegister: FormGroup;
  public profileForm: FormGroup;
  disabled = true;
  userObj: any;
  user: ClientUser;
  dt: any = [];

  constructor(private userService: ClientServiceService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit() {
    const userObj: any = JSON.parse(localStorage.getItem('currentUser'));
    console.log(userObj.token);
    this.FormRegister = new FormGroup({
      middlename : new FormControl('', Validators.required),
      sex : new FormControl('', Validators.required),
      status : new FormControl('', Validators.required),
      department : new FormControl('', Validators.required),
      commencing : new FormControl('', Validators.required),
      eduaction : new FormControl('', Validators.required),
      level : new FormControl('', Validators.required),
      directExpriance : new FormControl('', Validators.required),
      independentExpriance : new FormControl('', Validators.required),
      crt : new FormControl('', Validators.required),
      username : new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      _userId: new FormControl('')
    });

    // this.userService.getUserInfo(userObj.user.userid)
    // .subscribe(data => {
    //   if(data.success === false){
    //       this.router.navigate(['form']);
    //   } else {
    //     this.dt = data.message[0];
    //     if(this.dt != null){
    //       this.router.navigate(['user/dashboard']);
    //     }else{
    //       this.router.navigate(['form']);
    //     }
    //   }
    // });

    this.userService.getUser(userObj.user.userid)
    .subscribe(data => {
      if(data.success === false) {
        if (data.errcode){
          this.userService.logout();
          this.router.navigate(['login']);
        }
        this.toastr.error(data.message);
      } else {
        this.user = data.data[0];
        this.dt = data.data[0];
        this.populateForm(this.user);
      }
    });
  }
  populateForm(data): void {
    this.FormRegister.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      _userId: data._id
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.FormRegister.controls[controlName].hasError(errorName);
  }

  public UserRegister(formdata){
    // let id = this.userObj.user.userid;
    // this.FormRegister.value.id = id;
    console.log(formdata);
    if(this.FormRegister.valid && this.FormRegister.dirty){
      let theForm = this.FormRegister.value;

      this.userService.userData(theForm).subscribe(data => {
        if (data.success === false) {
          this.toastr.error(data.message);
        } else {
          this.toastr.success(data.message);
          this.FormRegister.reset();
          this.router.navigate(['user/dashboard']);
        }
    });
    }
  }

}
