import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../services/models/User-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isSaving: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if window and document are available (browser environment)
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.body.style.backgroundColor = '#323232';
    }
  }

  ngOnDestroy(): void {
    // Check if window and document are available (browser environment)
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.body.style.backgroundColor = '';
    }
  }

  handleSubmit(): void {
    this.isSaving = true;

    const userDTO: UserDTO = {
      email: this.email,
      password: this.password,
      role: '',
    };

    this.authService.login(userDTO).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token);

        // Assuming the response contains the role of the user
        const userRole = response.user.role;
        localStorage.setItem('role', response.user.role);

        Swal.fire({
          icon: 'success',
          title: 'Login successfully!',
          showConfirmButton: false,
          timer: 1500
        });

        // Redirect based on role after showing the success message
        setTimeout(() => {
          if (userRole === 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (userRole === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else if (userRole === 'technicien') {
            this.router.navigate(['/technicien-dashboard']);
          }
          this.isSaving = false;
        }, 1500);
      },
      error: (err) => {
        console.error('Login failed', err);
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          text: err.error?.errorMessage || 'Invalid email or password',
          showConfirmButton: true,
        });
        this.isSaving = false;
      }
    });
  }
}
