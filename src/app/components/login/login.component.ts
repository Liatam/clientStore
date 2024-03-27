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
  showErrorAlert: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inject Router
  ) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      {
        next: (response) => {
          this.authService.storeToken(response.token); 
          this.authService.storeId(response.userId);
          this.router.navigate(['/products']);
        },
        error: error => {
          this.showErrorAlert = true;
          this.errorMessage = error.error; 
        }
      });
  }

  hideErrorAlert() {
    this.showErrorAlert = false;
    this.errorMessage = '';
  }
}
