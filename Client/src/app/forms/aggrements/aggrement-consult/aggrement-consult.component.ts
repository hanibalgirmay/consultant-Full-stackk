import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aggrement-consult',
  templateUrl: './aggrement-consult.component.html',
  styleUrls: ['./aggrement-consult.component.css']
})
export class AggrementConsultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
