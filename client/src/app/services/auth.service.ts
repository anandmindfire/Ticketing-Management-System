import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // API URL for authentication

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(error => {
        console.error('Registration failed:', error);
        return of(false); // Return false on error (registration failed)
      })
    );
  }

  // Login user
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.success) {
          console.log("login success")
        }
        return response;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(false); // Return false on error (login failed)
      })
    );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('currentUser'); // Remove user details from local storage
  }

  // Check if user is logged in (check local storage)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Get user details from local storage
  getUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
