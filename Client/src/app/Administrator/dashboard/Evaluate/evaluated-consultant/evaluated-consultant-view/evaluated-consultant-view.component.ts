import { Component, OnInit } from '@angular/core';
import { EvaluateConsultant } from '../../../../../forms/model/evaluate-consultant';
import { EvaluationConsultService } from '../../../../../services/evaluation-consult.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-evaluated-consultant-view',
  templateUrl: './evaluated-consultant-view.component.html',
  styleUrls: ['./evaluated-consultant-view.component.css']
})
export class EvaluatedConsultantViewComponent implements OnInit {
  public consultant:any = [];

  constructor(private evalService: EvaluationConsultService,
              private router:Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getEvaluateConsultantByID();
  }

  getEvaluateConsultantByID() {
    // this.consultant = [];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.evalService.getDataById(id).subscribe((data: {}) => {
      console.log(data);
      this.consultant = data;
    });
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
  

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    const stylesHtml = this.getTagsHtml('style');
    const linksHtml = this.getTagsHtml('link');
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Evaluation Consultant service</title>
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

  public redirectRequest(id){
    let url = `aau/admin/dashboard/consultant/list/details/${id}`;
    this.router.navigate([url]);
  }

}
