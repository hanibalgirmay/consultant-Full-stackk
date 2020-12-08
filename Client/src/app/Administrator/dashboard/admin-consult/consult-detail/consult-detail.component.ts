import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Consultant } from '../../../../forms/model/consultant';
import { ConsultantService } from '../../../../services/consultant.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consult-detail',
  templateUrl: './consult-detail.component.html',
  styleUrls: ['./consult-detail.component.css']
})
export class ConsultDetailComponent implements OnInit {
	@Input() public owner: Consultant;
  public selectOptions = [{name:'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();
  consultant:any = [];
  selectedFile: File = null;
  attach:any;
  checked = false;
  disabled = true;
  public validationForm: FormGroup;

  constructor(private consultantService: ConsultantService , 
              private router: Router, 
              private activeRoute: ActivatedRoute,
              private location:Location,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getConsultantsByID();

    this.validationForm = new FormGroup({
      email: new FormControl(),
      subject:new FormControl('',Validators.required),
      message:new FormControl('', Validators.required),
      attach: new FormControl(false)
    });
  }

  getConsultantsByID() {
    this.consultant = [];
    let id: string = this.activeRoute.snapshot.params['_id'];
    this.consultantService.getConsultancyRequetById(id).subscribe((data: {}) => {
      console.log(data);
      this.consultant = data;
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

  createFormData(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
      const file=event.target.files[0];
      if(file.type.includes("image")){//Evaluar si es una imagen
          const reader= new FileReader();
          reader.readAsDataURL(file);
          reader.onload=function load(){
              this.image=reader.result; //Asignar al thumbnail
          }.bind(this);
          this.attach=file;
      }else{
          this.toastr.error('error','please select image file');
      }
    }
  }

  public replay(id) {
    // this.getConsultantsByID();
    // console.log(id);
    // console.log(this.consultant.email);
    if(this.validationForm.dirty && this.validationForm.valid){
      let emails = this.consultant.email;
      let attach = this.checked;
      this.validationForm.value.email = emails;
      let vform = this.validationForm.value;

      console.log(vform);

      this.consultantService.redirectGmail(vform)
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

    // this.getConsultantsByID();

    // this.consultantService.redirectGmail()
  }

}
