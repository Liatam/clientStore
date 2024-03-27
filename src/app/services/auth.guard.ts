// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Alert } from 'react-bootstrap';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) { }
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true
    } else {
      alert("Please Login First!");
      this.router.navigate(['/home/login'])      
      return false;
    }
  }

}
export const IsAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {
  return inject(AuthGuard).canActivate();
}