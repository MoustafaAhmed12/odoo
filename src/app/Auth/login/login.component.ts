// src/app/pages/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  username: string = '';
  password: string = '';
  db: string = '';
  errorMessage: string = '';

  onSubmit() {
    this.errorMessage = '';
    this.authService.login(this.username, this.password, this.db).subscribe({
      next: (response) => {
        if (response.result) {
          this.router.navigate(['/projects']);
        } else {
          this.errorMessage = 'فشل تسجيل الدخول';
        }
      },
      error: (error) => {
        this.errorMessage = 'حدث خطأ أثناء تسجيل الدخول';
        console.error('Login error:', error);
      },
    });
  }
}
