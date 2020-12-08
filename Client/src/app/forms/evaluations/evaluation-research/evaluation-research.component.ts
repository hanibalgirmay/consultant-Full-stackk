import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EvaluationResearchService } from '../../../services/evaluation-research.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-research',
  templateUrl: './evaluation-research.component.html',
  styleUrls: ['./evaluation-research.component.css']
})
export class EvaluationResearchComponent implements OnInit {
  public validationForm : FormGroup;

  constructor(private evaluateService: EvaluationResearchService,
              private router: Router) { }

  ngOnInit() {
    this.validationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
      company_Name: new FormControl('', Validators.required),
      tin_number: new FormControl('', Validators.required),
      company_address: new FormControl('', Validators.required),
      tell_number: new FormControl('', Validators.required),
      contact_person: new FormControl('', Validators.required),
      area_of_research: new FormControl('', Validators.required),
      level_of_research: new FormControl('', Validators.required),
      topics_of_research: new FormControl('', Validators.required),
      research_time: new FormControl('', Validators.required),
      total_research_hour: new FormControl('', Validators.required),
      where_delivery_service: new FormControl('', Validators.required),
      name_research: new FormControl('', Validators.required),
      transport_provision: new FormControl('', Validators.required),
      quality: new FormControl('', Validators.required),
      problem: new FormControl('', Validators.required),
      delivery: new FormControl('', Validators.required),
      responsiveness: new FormControl('', Validators.required),
      integrity: new FormControl('', Validators.required),
      performance: new FormControl('', Validators.required),
      Overall_evaluation: new FormControl('', Validators.required),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.validationForm.controls[controlName].hasError(errorName);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  public sendEvalResearch(formdata):void{
    console.log(formdata);
    if(this.validationForm.dirty && this.validationForm.valid){
      let vForm = this.validationForm.value;

      this.evaluateService.sendEvalResearch(vForm)
      .subscribe(data =>{
        if(data.success === false){
          alert(data.message);
          // this.toastr.error(data.message, 'error');
        }
        else{
          this.validationForm.reset();
          this.router.navigate(['/form/finished']);
          alert(data.message);
        } 
      },
      err => {
        if (err.status === 422) {
          alert (err.error.join('<br/>'));
        }
        else 
          alert ('Something went wrong.Please contact admin.');
        
      });
    }
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
          <title>Consultant Request</title>
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
}