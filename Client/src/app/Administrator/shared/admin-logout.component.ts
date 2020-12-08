import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  template:''
})

export class AdminLogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService){}

    ngOnInit(){
      this.authService.logout();
      // alert('user logged out');
      this.toastr.success('You have logged out.');
      this.router.navigate(['aau/admin/login']);
    }
}
