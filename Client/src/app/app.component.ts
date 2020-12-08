import { Component } from '@angular/core';
import { AuthService } from './Administrator/services/auth.service';
import { Router, NavigationEnd} from '@angular/router'; 
import { ClientServiceService } from './home/service/client-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'materialPro';

  constructor(private authService: AuthService,
             private router:Router,
             private userService: ClientServiceService){
  	//subscribes every changes of your route
   this.router.events.subscribe((event) => {
       if (event instanceof NavigationEnd){
          //scroll to top
          window.scrollTo(0,0);
       }
    });
  }
}
