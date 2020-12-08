import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Research } from '../../../../forms/model/research';
import { ResearchService } from '../../../../services/research.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-research-detail',
  templateUrl: './research-detail.component.html',
  styleUrls: ['./research-detail.component.css']
})
export class ResearchDetailComponent implements OnInit {
  research: any = [];
  public validationForm : FormGroup;
  attach:any;
  checked = false;
  disabled = true;

  constructor(private researchService: ResearchService, 
              private router: Router, 
              private toastr: ToastrService,
              private location:Location,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getResearchByID();
    
    this.validationForm = new FormGroup({
      email: new FormControl(),
      subject:new FormControl('',Validators.required),
      message:new FormControl('', Validators.required),
      attach: new FormControl(false)
    });
  }

  getResearchByID() {
    this.research = [];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.researchService.getResearchRequetById(id).subscribe((data: {}) => {
      console.log(data);
      this.research = data;
    });
  }

  back(){
    this.location.back();
  }

  private getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
    const htmlStr: string[] = [];
    const elements = document.getElementsByTagName(tagName);
    for (let idx = 0; idx < elements.length; idx++)
    {
        htmlStr.push(elements[idx].outerHTML);
    }

    return htmlStr.join('\r\n');
  }

  public print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    const stylesHtml = this.getTagsHtml('style');
    const linksHtml = this.getTagsHtml('link');
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Research Request</title>
          ${linksHtml}
          ${stylesHtml}
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
      let emails = this.research.email;
      let attach = this.checked;
      this.validationForm.value.email = emails;
      let vform = this.validationForm.value;

      console.log(vform);

      this.researchService.redirectGmail(vform)
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
