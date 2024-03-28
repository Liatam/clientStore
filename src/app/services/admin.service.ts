import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:4200/api/admin';
  token: string = localStorage.getItem('token') ?? '';

  constructor(private http: HttpClient) { }

  fetchConnectedUsersCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/connectedUsersCount`);
  }
}
