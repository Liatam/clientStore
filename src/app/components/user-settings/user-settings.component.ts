import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  updateUserRequest: User = {
    id: '',
    username: '',
    password: ''
    // Add more properties as needed for updating user information
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = localStorage.getItem("userId")!;
    this.authService.getUser(id).subscribe({
      next: (user) => {
        this.updateUserRequest = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  updateUser() {
    this.authService
      .updateUser(this.updateUserRequest.id, this.updateUserRequest)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/success-update']);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
