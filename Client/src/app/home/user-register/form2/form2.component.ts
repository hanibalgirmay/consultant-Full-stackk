import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  step: FormGroup;

  constructor() {}
  @Input() regForm: FormGroup;

  ngOnInit() {
  }


  step2Submitted() {
    this.regForm.get('contactDetails').get('email').markAsTouched();
    this.regForm.get('contactDetails').get('email').updateValueAndValidity();
  }

}
