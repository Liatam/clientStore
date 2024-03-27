import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard{
    constructor(private auth: AuthService, private router: Router) { }
  
    canActivate(): boolean {
      if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
        return true;
      } else {
        alert("You are not authorized!");
        this.router.navigate(['/home']); // or any other route
        return false;
      }
    }
}
