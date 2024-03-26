import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router // Inject Router
  ) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      {
        next: (response) => {
          console.log("response", response)
          // Handle successful login, e.g., store token in localStorage
          console.log('Login successful. Token:', response.token);
          console.log('Login successful. id user:', response.userId);
          this.authService.storeToken(response.token); // Store token in AuthService
          this.authService.storeId(response.userId);
          // Navigate to 'products' page
          this.router.navigate(['/products']);
        },
        error: error => {
          console.error('Login failed:', error);
        }
      });
  }
}
