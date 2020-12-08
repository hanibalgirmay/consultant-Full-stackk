import { Component, OnInit, Input,AfterViewInit  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistrRequest} from './registr-request';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css']
})
export class Form3Component implements OnInit {

  constructor() { }
  @Input() regForm: FormGroup;
  registrationForm: FormGroup;
  personalDetails: FormGroup;
  contactDetails: FormGroup;
  formSubmitted: boolean = false;
  public contactRequest: string;

  ngOnInit() {
  }
  submit() {
    console.log('submitted');
    console.log(this.regForm.value);
    this.formSubmitted = true;
   
    const result: RegistrRequest = Object.assign({}, this.regForm.value);
    // result.personalDetails = Object.assign({}, result.personalDetails);
    // result.contactDetail = Object.assign({}, result.contactDetail);
    
    // console.log(result);
  }

}
