import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ResearchService } from '../../services/research.service';
import { Research } from '../model/research';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
	public validationForm: FormGroup;

  constructor(private researchService: ResearchService,  
              private route: ActivatedRoute, 
              private router: Router,
              private toastr: ToastrService) { }


  ngOnInit(){
    this.validationForm = new FormGroup({
      company_Name: new FormControl('', Validators.required),
      tin_number: new FormControl('', Validators.required),
      company_address: new FormControl('', Validators.required),
      tell_number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact_person: new FormControl('', Validators.required),
      area_of_research: new FormControl('', Validators.required),
      level_of_research: new FormControl('', Validators.required),
      topics_of_research: new FormControl('', Validators.required),
      research_time: new FormControl('', Validators.required),
      total_research_hour: new FormControl('', Validators.required),
      where_delivery_service: new FormControl('', Validators.required),
      name_of_researchers: new FormControl('', Validators.required),
      transport_provision: new FormControl('', Validators.required),
      payable_week_before_research: new FormControl('', Validators.required),
      payable_date_request: new FormControl('', Validators.required),
      payable_week_after: new FormControl('', Validators.required)
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

  public createConsult = (validationFormValue) => {
    if (this.validationForm.valid) {
      this.executeOwnerCreation(validationFormValue);
    }
  }

  private executeOwnerCreation = (validationFormValue) => {
    let owner: Research = {
          company_Name: validationFormValue.companyNameControl,
          tin_number: validationFormValue.tinControl,
          company_address:validationFormValue.companyAddressControl,
          tell_number: validationFormValue.tellNumberControl,
          email:  validationFormValue.emailControl,
          contact_person: validationFormValue.contactPersonControl,
          area_of_research: validationFormValue.areaControl,
          level_of_research: validationFormValue.levelResearchControl,
          topics_of_research: validationFormValue.topicControl,
          research_time: validationFormValue.researchTimeControl,
          total_research_hour: validationFormValue.totalResearchHourControl,
          where_delivery_service: validationFormValue.whereDeliveryControl,
          name_of_researchers: validationFormValue.nameOfResearcherControl,
          transport_provision: validationFormValue.transportControl,
          payable_week_before_research: validationFormValue.payableWeekBeforeControl,
          payable_date_request: validationFormValue.payableDateControl,
          payable_week_after: validationFormValue.payableWeekAfterControl
        }

  }

  sendForm(formdata:any): void{
    console.log(formdata);
    if(this.validationForm.dirty && this.validationForm.valid){
      let vform = this.validationForm.value;
      console.log(vform);

      this.researchService.createResearchRequest(vform)
        .subscribe(data =>{
          this.validationForm.reset();
          this.toastr.success('Research request successfully');
          this.router.navigate(['/form/finished']);
        },
        err => {
          if (err.status === 422) {
            alert (err.error.join('<br/>'));
          }
          else 
            this.toastr.error('Something went wrong.Please contact admin.');
          
      });
        
    }
  }

}
