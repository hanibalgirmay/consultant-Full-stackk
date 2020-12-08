import { Component, OnInit, ViewChild ,AfterViewInit } from '@angular/core';
import { UsersService} from '../../../services/users.service';
import { ClientUser} from '../../../forms/model/clientUser';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router , ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../forms/model/message';
import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent  implements OnInit {
  public validateForm: FormGroup;

  public displayedColumns = ['select', 'firstname', 'lastname', 'email', 'msg', 'send' ,'details', 'delete'];
  public dataSource = new MatTableDataSource<ClientUser>(); 
  selection = new SelectionModel<ClientUser>(true, []);

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ClientUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  users:any = [];
  data:any =[];
  lastAction: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UsersService, 
              private router: Router,   
              private toastr: ToastrService,
              private messageService:MessageService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();

    this.validateForm = new FormGroup({
      email: new FormControl(),
      subject:new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
    
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.validateForm.controls[controlName].hasError(errorName);
  }

  getRecord(event) {
    let x = this.isAllSelected();
    console.log(event);

  }

  ngAfterViewInit():void{
  	this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getUsers = () =>{
    // this.ClientUser = [];
  	this.userService.getUsers()
  	.subscribe((res:{})=> {
  		this.dataSource.data = res as ClientUser[];
      // this.ClientUser = res;
  	},
  	(error) =>{
  		alert(error)
  	});
  }

  public localMessage = (id: string)=>{
    let url: string = `/aau/admin/dashboard/users/list/detail/${id}`;
    console.log(id);
    this.router.navigate([url]);
  }

  public viewPro = (id:string)=>{
    let url: string = `/aau/admin/dashboard/users/list/detail/profile/${id}`;
    console.log(id);
    this.router.navigate([url]);
  }

  public sendMessage(formdata:any):void{
    console.log(formdata);
    this.validateForm.value.Recipant = `${this.data._id}`;
    if(this.validateForm.dirty && this.validateForm.valid){
      let emails = this.users.email;
      this.validateForm.value.email = emails;
      let vform = this.validateForm.value;
      console.log(vform);
      console.log(this.data._id)

      this.userService.send(vform)
      .subscribe(res => {
        this.toastr.success(`Message successfully sent to user ${this.data.email}`)
        this.getUsers();
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

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public deleteUsers(id) {
    this.userService.deleteUsers(id)
      .subscribe(res => {
          this.getUsers();
        }, (err) => {
          console.log(err);
        }
      );
  }

  public detail(id){
    this.userService.getUsersById(id)
    .subscribe(res => {
      this.data = res;
    },(err) => {
      console.log(err);
    })
  }

}
