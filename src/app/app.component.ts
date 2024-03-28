// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AppSignalRService } from './services/app-signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userCount: number = 0; 
  title = 'client';

  constructor(public authService: AuthService, private signalRService: AppSignalRService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addUserCountListener((count) => {
      this.userCount = count;
    });
  }
}
