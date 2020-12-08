import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ResearchService } from '../../../services/research.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Research } from '../../../forms/model/research';

@Component({
  selector: 'app-admin-research',
  templateUrl: './admin-research.component.html',
  styleUrls: ['./admin-research.component.css'],
  providers: [ResearchService]
})
export class AdminResearchComponent implements OnInit {
  public displayedColumns = ['research_topic', 'client_name','client_address', 'date', 'target', 'status', 'contactPerson','details', 'delete'];
  public dataSource = new MatTableDataSource<Research>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private researchService: ResearchService, private router: Router) { }

  ngOnInit() {
  	this.getResearch();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getResearch = () => {
    this.researchService.getResearchRequest()
    .subscribe(res => {
      this.dataSource.data = res as Research[];
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
    let url: string = `aau/admin/dashboard/research/list/details/${id}`;
    console.log(id);
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `research/list/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `research/list/delete/${id}`;
    this.router.navigate([url]);
  }

}
