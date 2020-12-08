import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-evaluation-training',
  templateUrl: './evaluation-training.component.html',
  styleUrls: ['./evaluation-training.component.css']
})
export class EvaluationTrainingComponent implements OnInit {
  public validationForm : FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
