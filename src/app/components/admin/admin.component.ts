import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  connectedUsersCount!: number;
  errorMessage!: string;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchConnectedUsersCount();
  }

  fetchConnectedUsersCount() {
    this.adminService.fetchConnectedUsersCount()
      .subscribe({
        next: (data) => {
          console.log("data============", data);
          this.connectedUsersCount = data.count;
        },
        error: (error) => {
          this.errorMessage = error.message; // or handle error appropriately
          console.error('Error fetching connected users count:', error);
        }
      });
  }
  
  
}
