import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Administrator/services/auth.service';
import { UserService} from '../../../Administrator/user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  userObj: any;
  dt :any =[];

  constructor(public authService: AuthService, public adminService: UserService) { }

  ngOnInit() {
    this.userObj = this.authService.currentUser;

    this.getUser();
  }

  getUser(){
    this.dt = [];
    this.adminService.getUser(this.userObj.userid)
    .subscribe(data => {
      console.log(data);
      this.dt = data.data[0];
    });
  }

}
