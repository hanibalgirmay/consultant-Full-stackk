import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsersService } from '../../../../services/users.service';
import { MessageService } from '../../../../services/message.service';
import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import { Message} from '../../../../forms/model/message';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  public displayedColumns = ['id','subject', 'message', 'date', 'details', 'delete'];
  public dataSource = new MatTableDataSource<Message>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  usr:any= [];
  msg:any= [];
  validationForm: FormGroup;
  public index:Number = 1;

  constructor(private activeRoute: ActivatedRoute, 
              private messageService:MessageService, 
              private userService:UsersService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserByID();
    this.getUserMessage();

    this.validationForm = new FormGroup({
      subject:new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
      // Recipant : ''
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getUserByID() {
    this.usr = [];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.userService.getUsersById(id).subscribe((data: {}) => {
      console.log(data);
      this.usr = data;
      // console.log(this.usr);
    });
  }

  public getUserMessage(){
    this.getUserByID();
    this.msg =[];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.messageService.getMessageUser(id).subscribe(data =>{
      console.log(data);
      this.dataSource.data = data.data.docs as Message[];
      this.msg = data.data.docs[0];
      console.log(this.msg);
    });

  }

  public sendMessage(formdata:any):void{
    console.log(formdata);
    this.getUserByID();
    this.validationForm.value;
    let id: string = this.activeRoute.snapshot.params['_id'];
    if(this.validationForm.dirty && this.validationForm.valid){
      let vform = this.validationForm.value;
      // console.log(vform);
      // console.log(this.data._id)
      this.messageService.sendMessage(id, vform)
      .subscribe(res => {
        this.toastr.success(`Message successfully sent to user`)
        this.getUserMessage();
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

  delete(){
    
  }

}
