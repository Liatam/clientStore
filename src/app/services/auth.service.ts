import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

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
 
  updateUser(id: string, updateUserRequest: User): Observable<User> {
    return this.http.put<User>(this.apiUrl+"/users/"+id, updateUserRequest, { headers: this.getHeaders() });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl+"/users/"+id, { headers: this.getHeaders() });
  }
}
