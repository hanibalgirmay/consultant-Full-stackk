import { Component, OnInit, ViewChild ,AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../forms/model/message';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessageService]
})
export class MessageComponent implements OnInit {

  public displayedColumns = ['id','subject', 'message', 'details' ,'update', 'delete'];
  public dataSource = new MatTableDataSource<Message>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  message:any= [];
  data:any=[];
  delet:any=[];
  report = new FormControl('opt3');

  constructor(private messageService: MessageService, 
  				private router:Router,
  				 private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.getMessage();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  } 

  public getMessage = () => {
    this.message = [];
    this.messageService.getAllMessage()
    .subscribe(res => {
      this.dataSource.data = res as Message[];
      this.message = res;
    },
    (error) => {
      // this.handleError(error);
      alert(error);
    });
  }
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDelete = (id: string) => {
    console.log(id);
    this.messageService.getMessages(id)
    .subscribe((res :{}) => {
      this.delet = res;
    });
  }

  public redirectToDetails = (id) => {
    console.log(id);
    this.messageService.getMessages(id)
    .subscribe(res  => {
      this.data = res.data[0];
      const modal = `data-toggle="modal" data-target="#view" `
    });
  }

  public deleteMessage(id) {
    this.messageService.deleteMessage(id)
      .subscribe(data => {
        this.getMessage();
        console.log("data deleted" + data);
        }, (err) => {
          console.log(err);
        }
      );
  }
  // getMessage() {
  // 	let id: string = this.activeRoute.snapshot.params['_id'];
  //   this.message = [];
  //   this.messageService.getMessageUser(id).subscribe((data: {}) => {
  //     console.log(data);
  //     this.message = data;
  //   });
  // }

}
