import { Component, OnInit } from '@angular/core';
import { Training } from '../../../../forms/model/training';
import { TrainingService } from '../../../../services/training.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent implements OnInit {
  training:any = [];
  public validationForm : FormGroup;
  attach:any;
  checked = false;
  disabled = true;

  constructor(private trainingService: TrainingService, 
                private router: Router,
                private toastr: ToastrService, 
                private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getTrainingByID();
    this.validationForm = new FormGroup({
      email: new FormControl(),
      subject:new FormControl('',Validators.required),
      message:new FormControl('', Validators.required),
      attach: new FormControl(false)
    });
  }

  getTrainingByID() {
    this.training = [];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.trainingService.getTrainingRequetById(id).subscribe((data: {}) => {
      console.log(data);
      this.training = data;
    });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Consultant Request</title>
          <link rel="stylesheet" type="text/css" href="consult-detail.component.css" />
          <style>
          //........Customized style.......

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  public replay(id) {
    // this.getConsultantsByID();
    // console.log(id);
    // console.log(this.consultant.email);
    if(this.validationForm.dirty && this.validationForm.valid){
      let emails = this.training.email;
      let attach = this.checked;
      this.validationForm.value.email = emails;
      let vform = this.validationForm.value;

      console.log(vform);

      this.trainingService.redirectGmail(vform)
      .subscribe((data:Response) =>{
        this.validationForm.reset();
        this.toastr.success('data is inserted')
        this.router.navigate(['aau/admin/dashboard/consultant/list']);
       
      },
      err => {
        if (err.status === 422) {
          alert (err.error.join('<br/>'));
        }
        else 
          this.toastr.error('Something went wrong.Please try again.')
        
      });
    }

  }

}
