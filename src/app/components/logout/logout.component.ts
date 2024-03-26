// logout.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout(); // Call the logout method from the AuthService
    this.router.navigate(['/products']); // Redirect the user to the home page
  }
}
