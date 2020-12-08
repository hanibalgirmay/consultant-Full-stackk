import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {ResearchService} from '../../../../services/research.service';
import {Research} from '../../../../forms/model/research';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportprogress-research',
  templateUrl: './reportprogress-research.component.html',
  styleUrls: ['./reportprogress-research.component.css']
})
export class ReportprogressResearchComponent implements OnInit {
  
  private dt:any = [];

  constructor(private service:ResearchService, private router:Router) { }

  ngOnInit() {
  }

  private getdata(){

    this.service.getResearchRequest()
    .subscribe(res => {
      this.dt = res;
    },
    (error) => {
      // this.handleError(error);
      console.log(error);
    })
  }

}
