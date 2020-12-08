import { Component, OnInit, ViewChild ,AfterViewInit, ElementRef } from '@angular/core';
import { PartnerService } from '../../../services/partner.service';
import { Partner } from '../../../forms/model/partner';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { ImageErrorComponent } from './image-error/image-error.component';
import { FileDropDirective, FileSelectDirective} from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-partner',
  templateUrl: './admin-partner.component.html',
  styleUrls: ['./admin-partner.component.css'],
  providers: [PartnerService]
})
export class AdminPartnerComponent implements OnInit {

  public displayedColumns = ['id','name', 'websiteLink', 'phoneNumber', 'logo', 'details' ,'update', 'delete'];
  public dataSource = new MatTableDataSource<Partner>(); 

  partners:any = [];
  data: any = [];
  up:any = [];
  delete: any = [];
  index:Number = 1;
  public validationForm: FormGroup;
  public updateForm: FormGroup;
  selectedFile: File = null;
  fd = new FormData();
  partnerImage:any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private partnerService: PartnerService, 
              private router: Router,
              public snackBar:MatSnackBar,
              private toastr: ToastrService, 
              private el: ElementRef) { }

  ngOnInit() {
    this.getPartner();

    this.validationForm = new FormGroup({
      name:new FormControl('', Validators.required),
      websiteLink:new FormControl('', Validators.required),
      phoneNumber:new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      partnerImage:new FormControl('', Validators.required),
    });

    this.updateForm = new FormGroup({
      name:new FormControl('', Validators.required),
      websiteLink:new FormControl('', Validators.required),
      phoneNumber:new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      partnerImage:new FormControl('', Validators.required),
    })
  }
  

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  } 

  createFormData(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    if(event.target.files && event.target.files.length>0){
      const file=event.target.files[0];
      if(file.type.includes("image")){
          const reader= new FileReader();
          reader.readAsDataURL(file);
          reader.onload=function load(){
              this.image=reader.result; //Asignar al thumbnail
          }.bind(this);
          this.partnerImage=file;
      }else{
          this.toastr.error('error','please select image file');
      }
    }
  }

  public addPartner(){
    const form=this.validationForm.value;
    console.log(form);
    if(this.validationForm.dirty && this.validationForm.valid){
      // let vform = this.validationForm.value;
      console.log(this.validationForm.value);
      this.partnerService.addPartner(form)
      .subscribe((data:any)=>{
        console.log(data);
        // this.validationForm.reset();
        // this.router.navigate(['/form/finished']);
        alert('data is inserted successfully');
      },
      err => {
        if (err.status === 422) {
          alert (err.error.join('<br/>'));
        }
        else {
          alert ('Something went wrong.Please contact admin.');
        }
      });
    }
  }

  // public getByid = (id: string) => {
  //   let url : string = `${id}`
  //   this.partnerService.getPartnerById(url).subscribe((data: {}) => {
  //     console.log(data);
  //     this.partners = data;
  //   });
  // }

  public getPartner = () => {
    this.partners = [];
   this.partnerService.getPartners()
   .subscribe(res => {
     this.dataSource.data = res as Partner[];
     this.partners = res;
   },
   (error) => {
     // this.handleError(error);
     alert(error);
   })
  }
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDelete = (id: string) => {
    console.log(id);
    this.partnerService.getPartnerById(id)
    .subscribe((res :{}) => {
      this.delete = res;
    });
  }

  public redirectToDetails = (id) => {
    console.log(id);
    this.partnerService.getPartnerById(id)
    .subscribe((res :{}) => {
      this.data = res;
      const modal = `data-toggle="modal" data-target="#view" `
    });
  }

  public updatePartner = (id) => {
    console.log(id);
    this.partnerService.updatePartner(id,this.updateForm)
    .subscribe((res :{}) => {
      this.up = res;
      this.getPartner();
    });
  }

  // Delete employee
  public deletePartner(id) {
    this.partnerService.deletePartner(id)
      .subscribe(data => {
        this.getPartner();
        console.log("data deleted" + data);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
