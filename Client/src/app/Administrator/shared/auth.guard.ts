import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate , RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  constructor(private userService : AuthService , private router : Router, private toastr : ToastrService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string): boolean {
    if(this.userService.isLoggedIn()){
      return true;
    }

    this.toastr.info("Please login to access the page");
    // alert('please login to access the page');
    this.router.navigate(['aau/admin/login']);
    return false;
  }
}
