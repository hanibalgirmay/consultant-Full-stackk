import { Component, OnInit ,ViewChild ,AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Blog } from '../../../forms/model/blog';
import { BlogService } from '../../../services/blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {

  public displayedColumns = ['name', 'dateOfBlog', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Blog>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: any = [];
  validationForm: FormGroup;
  updateForm: FormGroup;

  constructor(private blogService: BlogService, 
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getBlog();

    this.validationForm = new FormGroup({
      title: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });

    this.updateForm = new FormGroup({
      title: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getBlog = () => {
    this.blogService.getBlogs()
    .subscribe(res => {
      this.dataSource.data = res as Blog[];
    },
    (error) => {
      // this.handleError(error);
      alert(error);
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    console.log(id);
    this.blogService.getBlogById(id)
    .subscribe((res :{}) => {
      this.data = res;
      const modal = `data-toggle="modal" data-target="#view" `
    });
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/owner/update/${id}`;
    this.router.navigate([url]);
  }

  // Delete employee
  public deleteBlog(id) {
    this.blogService.deleteBlog(id)
      .subscribe(data => {
        this.getBlog();
        console.log("data deleted" + data);
        }, (err) => {
          console.log(err);
        }
      );
  }

  public addBlog(formdata):void{
    if(this.validationForm.dirty && this.validationForm.valid){
      let vform = this.validationForm.value;
      this.blogService.createBlog(vform)
      .subscribe(data =>{
        this.validationForm.reset();
        // this.router.navigate(['/form/finished']);
        // alert('data is inserted successfully');
        this.getBlog();
        this.toastr.success('data is inserted successfully')
      },
      err => {
        if (err.status === 422) {
          alert (err.error.join('<br/>'));
        }
        else {
          // alert ('Something went wrong.Please contact admin.');
          this.toastr.error('Something went wrong.')
        }
      });
    }
  }

  public updateBlog(id) {
    console.log(id);
    if(this.updateForm.dirty && this.updateForm.valid){
      let vform = this.updateForm.value;
      this.blogService.updateBlog(id,vform)
      .subscribe(data =>{
        this.validationForm.reset();
        this.getBlog();
        this.toastr.success('blog is successfully updated')
      },
      err => {
        if (err.status === 422) {
          alert (err.error.join('<br/>'));
        }
        else {
          // alert ('Something went wrong.Please contact admin.');
          this.toastr.error('Something went wrong.')
        }
      });
    }
  }

}
