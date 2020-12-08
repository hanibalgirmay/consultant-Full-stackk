import { Component, OnInit } from '@angular/core';
import { EvaluateResearch } from '../../../../../forms/model/evaluate-research';
import { EvaluationResearchService } from '../../../../../services/evaluation-research.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import { ResearchService } from '../../../../../services/research.service';


@Component({
  selector: 'app-evaluated-research-view',
  templateUrl: './evaluated-research-view.component.html',
  styleUrls: ['./evaluated-research-view.component.css']
})
export class EvaluatedResearchViewComponent implements OnInit {
  public research:any = [];
  public da:any =[];

  constructor(private evalService: EvaluationResearchService,
              private router:Router,
              private researchService: ResearchService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getEvaluateResearchByID();
  }

  getEvaluateResearchByID() {
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.evalService.getDataById(id).subscribe((data: {}) => {
      console.log(data);
      this.research = data;
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
          <title>Evaluate Research service</title>
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
    // let compannyId = this.research.company_request_id;
    let url = `aau/admin/dashboard/research/list/details/${id}`;
    this.router.navigate([url]); 
  }

}
