import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  styleUrl: 'app.css',
  template: `
    <header class="topbar" role="navigation">
      <nav class="nav">
        <a routerLink="/notes" routerLinkActive="active">Notas</a>
        <a routerLink="/notes/new" routerLinkActive="active">Nueva nota</a>
        <a routerLink="/blog" routerLinkActive="active">Blog</a>
        <span class="spacer"></span>
        <a routerLink="/login" *ngIf="!user" class="link">Acceder</a>
        <a routerLink="/register" *ngIf="!user" class="link">Registro</a>
        <button (click)="logout()" *ngIf="user" class="btn">Salir</button>
      </nav>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  get user() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Simple reload to refresh state
    location.reload();
  }
}
