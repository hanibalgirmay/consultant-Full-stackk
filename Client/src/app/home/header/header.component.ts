import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: ClientServiceService) { }

  ngOnInit() {
  }

}
