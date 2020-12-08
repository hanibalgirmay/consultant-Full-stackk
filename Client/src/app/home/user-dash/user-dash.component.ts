import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../forms/model/message';
import {FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {
  userObj: any;
  user:any = [];
  _postsArray: Message[];
  public rs: any;
  

  constructor(private messageService: MessageService,private router: Router, private userService: ClientServiceService
    ) { }

  ngOnInit() {
    this.userObj = this.userService.currentUser;
    this.getMessageId();
    
  }

  getMessageId():void{
    this.user = [];
    this.messageService.getMessageUser(this.userObj.userid)
    .subscribe(data =>  {
      this.user = data.data.docs;
      console.log(data);
      var resource = JSON.stringify(data);
      console.log(resource);
    });
  }

  getMessage(id){
    console.log(id);
    let url: string = `message/detail/${id}`
    this.router.navigate([url]);
  }


}
