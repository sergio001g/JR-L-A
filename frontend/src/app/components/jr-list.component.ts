import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JrService, Jr } from '../jr.service';

@Component({
  selector: 'app-jr-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <h2 style="margin:0;">Jr</h2>
      <a routerLink="/jrs/new" style="padding:8px 12px;border:1px solid #333;border-radius:4px;text-decoration:none;">Nuevo</a>
    </div>

    <div *ngIf="loading()" style="padding:8px;">Cargando...</div>
    <div *ngIf="error()" style="padding:8px;color:#b00020;">{{ error() }}</div>
    <div *ngIf="!loading() && !error() && items().length === 0" style="padding:8px;color:#555;">No hay registros.</div>

    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Nombre</th>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Descripción</th>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items()">
          <td style="border-bottom:1px solid #eee;padding:8px;">{{ item.name }}</td>
          <td style="border-bottom:1px solid #eee;padding:8px;">{{ item.description }}</td>
          <td style="border-bottom:1px solid #eee;padding:8px;">
            <a [routerLink]="['/jrs', item.id, 'edit']" style="margin-right:8px;">Editar</a>
            <button (click)="delete(item)" style="padding:4px 8px;">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class JrListComponent {
  private service = inject(JrService);
  items = signal<Jr[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.service.list().subscribe({
      next: res => {
        this.items.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los datos.');
        this.loading.set(false);
      }
    });
  }

  delete(item: Jr) {
    if (!item.id) return;
    const ok = confirm('¿Seguro que deseas eliminar este registro?');
    if (!ok) return;
    this.service.remove(item.id).subscribe(() => this.load());
  }
}