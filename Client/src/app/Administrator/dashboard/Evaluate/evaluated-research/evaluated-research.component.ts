import { Component, OnInit, ViewChild } from '@angular/core';
import { EvaluationResearchService } from '../../../../services/evaluation-research.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { EvaluateResearch } from '../../../../forms/model/evaluate-research';

@Component({
  selector: 'app-evaluated-research',
  templateUrl: './evaluated-research.component.html',
  styleUrls: ['./evaluated-research.component.css']
})
export class EvaluatedResearchComponent implements OnInit {

  public displayedColumns = ['company_name', 'name', 'address', 'email', 'details', 'delete'];
  public dataSource = new MatTableDataSource<EvaluateResearch>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private evaluateService: EvaluationResearchService, private router:Router) { }

  ngOnInit() {
    this.getEvaluateResearch();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getEvaluateResearch = () => {
    this.evaluateService.getData()
    .subscribe(res => {
      this.dataSource.data = res as EvaluateResearch[];
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
    let url: string = `aau/admin/dashboard/evaluated/research/details/${id}`;
    // console.log(id);
    this.router.navigate([url]);
  }

}
