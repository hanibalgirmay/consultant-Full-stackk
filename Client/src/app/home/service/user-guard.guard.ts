import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ClientServiceService } from './client-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

	constructor(private userService: ClientServiceService, 
				private router: Router,
				private toastr: ToastrService){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    	return this.checkLoggedIn(state.url);
  	}

  	checkLoggedIn(url: string): boolean {
    	if(this.userService.isLoggedIn()){
      		return true;
    	}

    	this.toastr.info("Please login to access the page");
    	// alert('cant access this page unauthorized!');
    	this.router.navigate(['login']);
    	return false;
  	}
  
}
