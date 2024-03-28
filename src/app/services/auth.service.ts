import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5167/api';

  token: string = localStorage.getItem('token') ?? '';

  constructor(private http: HttpClient) { }

  // Helper function to create HttpHeaders with the Authorization header
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json' // Set content type if necessary
    });
  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/home/Login`, credentials);
  }

  signup(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/home/Signup`, userInfo);
  }

  logout(): void {
    localStorage.clear(); // Clear the token from localStorage
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }
  storeId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isAdmin(): Observable<boolean> {
    const userId = localStorage.getItem('userId');

    if (userId) {
      return this.getUser(userId).pipe(        
        map(user => {
          console.log("user=========== ", user)
          return user.role === 'admin';
        }),
        catchError(error => {
          console.error('Failed to fetch user data:', error);
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }


  updateUser(id: string, updateUserRequest: any): Observable<any> {
    return this.http.put<User>(this.apiUrl + "/users/" + id, updateUserRequest, { headers: this.getHeaders() });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/users/" + id, { headers: this.getHeaders() });
  }

}
