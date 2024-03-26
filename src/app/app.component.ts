// app.component.ts

import { Component, OnInit } from '@angular/core';
// import { AppSignalRService } from './services/app-signalr.service'
import { AuthService } from './services/auth.service'; // Import AuthService if not already imported

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  // userCount: number = 0; 
  // private signalRService: AppSignalRService,

  title = 'client';
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // this.signalRService.startConnection().subscribe(() => {
    //   this.signalRService.getUserCount().subscribe((count) => {
    //     this.userCount = count;
    //   });
    // });
  }

}
