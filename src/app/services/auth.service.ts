import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from './models/User-dto.model';
import { LoginResponse } from './models/LoginResponse';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:1010/api/auth/login';  // Update with your actual API endpoint

  constructor(private http: HttpClient) {}

  login(userDTO: UserDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.authUrl, userDTO);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Method to get the decoded token information
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  // Method to get current user details from the decoded token
  getCurrentUser(): UserDTO | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      return {
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role
      } as UserDTO;
    }
    return null;
  }
}
