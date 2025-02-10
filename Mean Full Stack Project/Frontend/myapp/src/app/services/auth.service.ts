import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = "http://localhost:5000/api/users";
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  // Register User 
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // Login User 
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials)
  }

  // Get User Data 
  getUsers(): Observable<any> {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
    return this.http.get(`${this.baseUrl}/usersData`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Edit/Update User Data 

  updateUser(userId: string, userData: any): Observable<any> {
    const token = isPlatformBrowser(this.platformId) ?
      localStorage.getItem('token') : null;

    return this.http.put(`${this.baseUrl}/users/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Delete User Data 
  deleteUser(userId: string): Observable<any> {
    const token = isPlatformBrowser(this.platformId) ?
      localStorage.getItem('token') : null;

    return this.http.delete(`${this.baseUrl}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

}
