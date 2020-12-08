import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  template:''
})

export class UserLogoutComponent implements OnInit {

  constructor(private authService: ClientServiceService,
              private router: Router,
              private toastr: ToastrService){}

    ngOnInit(){
      this.authService.logout();
      this.toastr.success('You have logged out.');
      this.router.navigate(['login']);
    }
}
