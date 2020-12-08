import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientServiceService } from './client-service.service';
import { ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PageFormGuard implements CanActivate {
  
  constructor(private userService: ClientServiceService, 
              private router: Router,
              private toastr: ToastrService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkFormIn(state.url);
  }

  checkFormIn(url: string): boolean {
    // if(this.userService.isLoggedIn()){
    //     return true;
    // }

    this.toastr.info("Please login to access the page");
    // alert('cant access this page unauthorized!');
    this.router.navigate(['login']);
    return false;
  }
}
