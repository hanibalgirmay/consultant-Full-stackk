import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ContactUsService } from '../../services/contact-us.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

	public validationForm : FormGroup;

  constructor(private fb: FormBuilder, 
              private router:Router ,
              private contactService: ContactUsService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  	this.validationForm = new FormGroup({
      name :new FormControl('', [Validators.required]),
      email : new FormControl('',[Validators.required]),
      subject : new FormControl('',[Validators.required]),
      message : new FormControl('', [Validators.required]),
  	});
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.validationForm.controls[controlName].hasError(errorName);
  }

  public sendForm(formdata:any):void {
    if(this.validationForm.dirty && this.validationForm.valid){
      let vform = this.validationForm.value;
      console.log(vform)
      this.contactService.sendMessage(vform)
      .subscribe(data =>{
        this.toastr.success('Thank you for given us your feedback.', 'Successfully');
        this.router.navigate(['home']);
        this.validationForm.reset();
        
      },
      err => {
        if (err.status === 422) {
          alert (err.error.join('<br/>'));
        }
        else 
          this.toastr.success('Something went wrong.Please contact admin');
        
    });
    }
  }

}
