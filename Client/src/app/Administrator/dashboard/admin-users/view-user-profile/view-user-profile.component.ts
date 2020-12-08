import { Component, OnInit } from '@angular/core';
import { ClientServiceService} from '../../../../home/service/client-service.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {
  public dt:any =[];

  constructor(private userService:ClientServiceService,private router:Router,private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.view();
  }

  private view(){
    this.dt = [];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.userService.getUser(id).subscribe(data => {
      console.log(data);  
      this.dt = data.data[0];
    });
  }

}
