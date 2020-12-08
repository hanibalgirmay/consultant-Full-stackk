import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { PartnerService } from '../../services/partner.service';
import { DataSource } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
// import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { Partner } from '../../forms/model/partner';
import {ErrorStateMatcher} from '@angular/material/core';

import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [PartnerService]
})
export class DashboardComponent implements OnInit {
  partners:any = [];
  // @Input() productData = { prod_name:'', prod_desc: '', prod_price: 0 };
  // dataSource = new UserDataSource(this.partnerService);
  // displayedColumns = ['name', 'description', 'logo', 'View', 'Delete'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  //  applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  validatingForm: FormGroup;

  constructor(private partnerService: PartnerService, private route: ActivatedRoute, private router: Router) { }

  delete(id) {
    this.partnerService.deletePartner(id)
      .subscribe(res => {
          this.getPartners();
        }, (err) => {
          console.log(err);
        }
      );
  }

  // addPartner() {
  //   this.partnerService.addPartner(this.productData).subscribe((result) => {
  //     this.router.navigate(['/product-details/'+result._id]);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  ngOnInit() {
    this.getPartners();
    // this.dataSource.sort = this.sort;
  }
 //  selectRow(row) {
 //   console.log(row._id);
 //   alert(row._id);
 // }
  getPartners() {
    this.partners = [];
    this.partnerService.getPartners().subscribe((data: {}) => {
      console.log(data);
      this.partners = data;
    });
  }
  companyNameControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher()


}
export class UserDataSource extends DataSource<any> {
  constructor(private partnerService: PartnerService) {
    super();
  }
  connect(): Observable<Partner[]> {
    return this.partnerService.getPartners();
  }
  disconnect() {}
}
