import { Component, OnInit } from '@angular/core';
import {MessageService } from '../../../services/message.service';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  msg:any =[];

  validationForm:FormGroup;

  constructor(private messageService:MessageService, private activeRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getMessageByID();

    this.validationForm = new FormGroup({
      subject:new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
      // Recipant : ''
    });
    
  }

  getMessageByID() {
    this.msg = [];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.messageService.getMessages(id).subscribe(data => {
      console.log(data);
      this.msg = data.data[0];
      console.log(this.msg);
    });
  }

  public sendMessage(formdata:any):void{
    console.log(formdata);
    // this.getUserByID();
    this.validationForm.value;
    let id:string = '5d18ada837193e26284c3125';
    if(this.validationForm.dirty && this.validationForm.valid){
      let vform = this.validationForm.value;
      // console.log(vform);
      // console.log(this.data._id)
      this.messageService.sendMessage(id, vform)
      .subscribe(res => {
        this.toastr.success(`Message successfully sent to user`)
        this.getMessageByID();
      },
      err => {
        if (err.status === 422) {
          alert (err.error.join('<br/>'));
        }
        else 
          this.toastr.error('Something went wrong.Please contact admin.')
        
      });
    }
  }

  

}
