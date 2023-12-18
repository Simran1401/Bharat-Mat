import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class dealerProfileGuard implements CanActivate{

  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (localStorage.getItem('userType') == 'DEALER' ) {
        return true
      }
      this.router.navigate(['/'])
      return false
  }

}
