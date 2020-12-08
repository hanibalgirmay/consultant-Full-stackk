import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Training } from '../../../forms/model/training';

@Component({
  selector: 'app-admin-training',
  templateUrl: './admin-training.component.html',
  styleUrls: ['./admin-training.component.css'],
  providers: [TrainingService]
})
export class AdminTrainingComponent implements OnInit {
	public displayedColumns = ['name', 'trainingTopic', 'language', 'minEducation', 'maxEducation', 'details', 'delete'];
  public dataSource = new MatTableDataSource<Training>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private traininigService: TrainingService, private router: Router) { }

  ngOnInit() {
  	this.getResearch();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getResearch = () => {
    this.traininigService.getTrainingRequest()
    .subscribe(res => {
      this.dataSource.data = res as Training[];
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
    let url: string = `aau/admin/dashboard/training/list/details/${id}`;
    console.log(id);
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `training/list/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `training/list/delete/${id}`;
    this.router.navigate([url]);
  }

}
