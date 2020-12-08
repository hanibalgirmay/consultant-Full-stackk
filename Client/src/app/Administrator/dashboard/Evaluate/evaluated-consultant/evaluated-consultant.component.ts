import { Component, OnInit, ViewChild } from '@angular/core';
import { EvaluationConsultService } from '../../../../services/evaluation-consult.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { EvaluateConsultant } from '../../../../forms/model/evaluate-consultant';

@Component({
  selector: 'app-evaluated-consultant',
  templateUrl: './evaluated-consultant.component.html',
  styleUrls: ['./evaluated-consultant.component.css']
})
export class EvaluatedConsultantComponent implements OnInit {

  public displayedColumns = ['company_name', 'name', 'address', 'email', 'details', 'delete'];
  public dataSource = new MatTableDataSource<EvaluateConsultant>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private evaluateService: EvaluationConsultService,private router: Router) { }

  ngOnInit() {
    this.getEvaluateConsult();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getEvaluateConsult = () => {
    this.evaluateService.getData()
    .subscribe(res => {
      this.dataSource.data = res as EvaluateConsultant[];
    },
    (error) => {
      // this.handleError(error);
      alert(error);
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails(id:string){
    let url: string = `aau/admin/dashboard/evaluated/consultant/details/${id}`;
    console.log(id);
    this.router.navigate([url]);
  }

}
