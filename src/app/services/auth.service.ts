import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from './models/User-dto.model';
import { LoginResponse } from './models/LoginResponse';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:1010/api/auth/login';  // Update with your actual API endpoint

  constructor(private http: HttpClient) { }

  login(userDTO: UserDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.authUrl, userDTO);
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if the token is stored in local storage
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    // Retrieve the token from local storage
    return localStorage.getItem('token');
  }
}
