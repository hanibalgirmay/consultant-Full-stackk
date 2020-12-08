import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ConsultantService } from '../../services/consultant.service';
import { Consultant } from '../model/consultant';
import { ActivatedRoute, Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent{

	public validationForm: FormGroup;

  constructor(private consultantService: ConsultantService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.validationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
      company_Name: new FormControl('', Validators.required),
      tin_number: new FormControl('', Validators.required),
      company_address: new FormControl('', Validators.required),
      tell_number: new FormControl('', Validators.required),
      contact_person: new FormControl('', Validators.required),
      area_of_consultancy: new FormControl('', Validators.required),
      level_of_consultancy: new FormControl('', Validators.required),
      topics_of_consultancy: new FormControl('', Validators.required),
      consultancy_time: new FormControl('', Validators.required),
      total_consultancy_hour: new FormControl('', Validators.required),
      where_delivery_service: new FormControl('', Validators.required),
      focal_person: new FormControl('', Validators.required),
      payable_week_before_consultancy: new FormControl('', Validators.required),
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
    let owner: Consultant = {
          company_Name: validationFormValue.companyNameControl,
          tin_number: validationFormValue.tinControl,
          company_address:validationFormValue.companyAddressControl,
          tell_number: validationFormValue.tellNumberControl,
          email:  validationFormValue.emailFormControl,
          contact_person: validationFormValue.contactPersonControl,
          area_of_consultancy: validationFormValue.areaControl,
          level_of_consultancy: validationFormValue.levelControl,
          topics_of_consultancy: validationFormValue.topicControl,
          consultancy_time: validationFormValue.consultancyTimeControl,
          total_consultancy_hour: validationFormValue.totalHourControl,
          where_delivery_service: validationFormValue.whereaboutControl,
          focal_person: validationFormValue.focalPersonControl,
          payable_week_before_consultancy: validationFormValue.payableWeekBeforeControl,
          payable_date_request: validationFormValue.payableDateControl,
          payable_week_after: validationFormValue.payableWeekAfterControl
        }

  }

  // matcher = new MyErrorStateMatcher()


  sendForm(formdata:any): void{
    console.log(formdata);
    if(this.validationForm.dirty && this.validationForm.valid){
      let vform = this.validationForm.value;
      console.log(vform);

      this.consultantService.createConsultancy(vform)
        .subscribe(data =>{
          this.validationForm.reset();
          this.router.navigate(['/form/finished']);
          alert('data is inserted successfully');
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
  
}
