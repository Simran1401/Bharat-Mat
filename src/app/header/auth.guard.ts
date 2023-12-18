import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { HttpService } from "../services/http.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.httpService.User.pipe(take(1),
    map( user => {
      const isAuth = !!user;
      if (isAuth) {
        return true
      }
      this.router.createUrlTree([''], {relativeTo: this.route})
      return false;
    })
    )
  }

}
