import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { TrainingService } from '../../services/training.service';
import { Training } from '../model/training';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
	public validationForm: FormGroup;

  constructor(private trainingService: TrainingService, 
              private router: Router, 
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
  	this.validationForm = new FormGroup({
      company_Name: new FormControl('', Validators.required),
      tin_number: new FormControl('', Validators.required),
      company_address: new FormControl('', Validators.required),
      tell_number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email,]),
      contact_person: new FormControl('', Validators.required),
      area_of_training: new FormControl('', Validators.required),
      level_of_training: new FormControl('', Validators.required),
      topics_of_training: new FormControl('', Validators.required),
      training_time: new FormControl('', Validators.required),
      numbers_of_traniner: new FormControl('', Validators.required),
      min_education_background_trainers: new FormControl('', Validators.required),
      highest_education_background_trainers: new FormControl('', Validators.required),
      language_perference: new FormControl('', Validators.required),
      linguistic_skill: new FormControl('',Validators.required),
      positional_level_trainers:new FormControl('',Validators.required),
      prefered_training_venue:new FormControl('',Validators.required),
      refrshiments_perference:new FormControl('',Validators.required),
      lunch_perference: new FormControl('',Validators.required),
      payable_week_before_training: new FormControl('', Validators.required),
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
    let owner: Training = {
          company_Name: validationFormValue.company_Name,
          tin_number: validationFormValue.tin_number,
          company_address:validationFormValue.company_address,
          tell_number: validationFormValue.tell_number,
          email:  validationFormValue.email,
          contact_person: validationFormValue.contact_person,
          area_of_training: validationFormValue.area_of_training,
          level_of_training: validationFormValue.level_of_training,
          topics_of_training: validationFormValue.topics_of_training,
          training_time: validationFormValue.training_time,
          numbers_of_traniner: validationFormValue.numbers_of_traniner,
          min_education_background_trainers: validationFormValue.min_education_background_trainers,
          highest_education_background_trainers: validationFormValue.highest_education_background_trainers,
          language_perference: validationFormValue.language_perference,
          linguistic_skill: validationFormValue.linguistic_skill,
          positional_level_trainers: validationFormValue.positional_level_trainers,
          prefered_training_venue: validationFormValue.prefered_training_venue,
          refrshiments_perference: validationFormValue.refrshiments_perference,
          lunch_perference: validationFormValue.lunch_perference,
          payable_week_before_research: validationFormValue.payable_week_before_research,
          payable_date_request: validationFormValue.payable_date_request,
          payable_week_after: validationFormValue.payable_week_after
        }

  }
  sendForm(formdata:any): void{
    console.log(formdata);
    if(this.validationForm.dirty && this.validationForm.valid){
      let vform = this.validationForm.value;
      console.log(vform);

      this.trainingService.createTraining(vform)
        .subscribe(data =>{
          this.validationForm.reset();
          this.toastr.success('Training request is successfully')
          this.router.navigate(['/form/finished']);
        },
        err => {
          if (err.status === 422) {
            alert (err.error.join('<br/>'));
          }
          else 
            this.toastr.error('Something went wrong.Please contact admin.')
          
      });
        
    }
  }


}
