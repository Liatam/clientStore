import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userInfo = { username: '', password: '' };
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  errorMessage: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }


  signup() {
    if (this.userInfo.password !== this.confirmPassword) {
      this.errorMessage = 'Password do not match';
      this.showErrorAlert = true;
      return;
    }
    this.authService.signup(this.userInfo).subscribe(
      response => {
        console.log('success: ', response.message);
        this.showErrorAlert = false;
        this.showSuccessAlert = true;
        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/home/login']);
        }, 2000);
      },
      error => {
        console.error('Signup failed:', error.error);
        // Show error alert
        this.showErrorAlert = true;
        this.errorMessage = error.error;
      }
    );
  }

  hideSuccessAlert() {
    this.showSuccessAlert = false;
  }

  hideErrorAlert() {
    this.showErrorAlert = false;
    this.errorMessage = '';
  }
}
