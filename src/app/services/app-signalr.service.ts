// import { Injectable } from '@angular/core';
// import * as signalR from '@microsoft/signalr';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AppSignalRService {
//   private hubConnection: signalR.HubConnection;

//   constructor() {
//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl('/realtimehub') // SignalR hub URL
//       .build();
//   }

//   startConnection(): Observable<void> {
//     return new Observable<void>((observer) => {
//       this.hubConnection
//         .start()
//         .then(() => {
//           console.log('Connection established with SignalR hub');
//           observer.next();
//           observer.complete();
//         })
//         .catch((error) => {
//           console.error('Error connecting to SignalR hub:', error);
//           observer.error(error);
//         });
//     });
//   }

//   getUserCount(): Observable<number> {
//     return new Observable<number>((observer) => {
//       this.hubConnection.on('UserCountUpdated', (count: number) => {
//         observer.next(count);
//       });
//     });
//   }
// }
