import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  template: `
  <h2>Registro</h2>
  <form (ngSubmit)="submit()" #f="ngForm" style="max-width:400px;display:grid;gap:8px;">
    <label>Nombre
      <input name="name" [(ngModel)]="name" required minlength="2" />
    </label>
    <label>Email
      <input name="email" [(ngModel)]="email" required type="email" />
    </label>
    <label>Contraseña
      <input name="password" [(ngModel)]="password" required type="password" minlength="6" />
    </label>
    <button type="submit">Crear cuenta</button>
    <p *ngIf="error" style="color:#b91c1c;">{{error}}</p>
  </form>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigateByUrl('/blog');
      },
      error: (err: any) => this.error = err?.error?.message || 'Error al registrar'
    });
  }
}