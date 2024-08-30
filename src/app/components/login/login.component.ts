import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../services/models/User-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(): void {
    const userDTO: UserDTO = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userDTO).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('authToken',response.token);
        this.router.navigate(['/dashboard']);  // Navigate to the dashboard or another route after successful login
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
