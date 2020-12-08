import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-error',
  templateUrl: './image-error.component.html',
  styles:[
    '.error-message{color:red}'
]
})
export class ImageErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
