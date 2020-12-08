import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { ConsultantService } from '../../../services/consultant.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Consultant } from '../../../forms/model/consultant';

@Component({
  selector: 'app-admin-consult',
  templateUrl: './admin-consult.component.html',
  styleUrls: ['./admin-consult.component.css'],
  providers: [ConsultantService]
})
export class AdminConsultComponent implements OnInit {
	
	public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'delete'];
  public dataSource = new MatTableDataSource<Consultant>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private consultantService: ConsultantService, private router: Router) { }

  ngOnInit() {
  	this.getConsultant();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getConsultant = () => {
    this.consultantService.getConsultancyRequest()
    .subscribe(res => {
      this.dataSource.data = res as Consultant[];
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
    let url: string = `aau/admin/dashboard/consultant/list/details/${id}`;
    console.log(id);
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/owner/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `/owner/delete/${id}`;
    this.router.navigate([url]);
  }

  // Delete employee
  deletePartner(id) {
    if (window.confirm('Are you sure, you want to delete?')){
        this.consultantService.deleteConsultantRequest(id).subscribe(data => {
        this.getConsultant()
      });
    }
  }

}
