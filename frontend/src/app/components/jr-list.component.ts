import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { JrService, Jr } from '../jr.service';

@Component({
  selector: 'app-jr-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <h2 style="margin:0;">Notas</h2>
      <a routerLink="/notes/new" style="padding:8px 12px;border:1px solid #333;border-radius:4px;text-decoration:none;">Nueva nota</a>
    </div>

    <div *ngIf="success()" style="padding:8px;border:1px solid #4CAF50;color:#2e7d32;border-radius:4px;margin-bottom:8px;">{{ success() }}</div>
    <div *ngIf="loading()" style="padding:8px;">Cargando...</div>
    <div *ngIf="error()" style="padding:8px;color:#b00020;">{{ error() }}</div>
    <div *ngIf="!loading() && !error() && items().length === 0" style="padding:8px;color:#555;">No hay registros.</div>

    <div style="display:flex;gap:8px;align-items:center;margin:8px 0;">
      <input (input)="onQueryChange($event.target.value)" placeholder="Buscar..." aria-label="Buscar" style="padding:6px 8px;border:1px solid #ccc;border-radius:4px;min-width:200px;" />
      <span style="color:#666;font-size:12px;">{{ filtered().length }} notas</span>
    </div>

    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Nombre</th>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Descripción</th>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of filtered()">
          <td style="border-bottom:1px solid #eee;padding:8px;">{{ item.name }}</td>
          <td style="border-bottom:1px solid #eee;padding:8px;">{{ item.description }}</td>
          <td style="border-bottom:1px solid #eee;padding:8px;">
            <a [routerLink]="['/notes', item.id, 'edit']" style="margin-right:8px;">Editar</a>
            <button (click)="copy(item)" style="padding:4px 8px;margin-right:8px;">Copiar</button>
            <button (click)="delete(item)" style="padding:4px 8px;">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class JrListComponent {
  private service = inject(JrService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  items = signal<Jr[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  query = signal<string>('');
  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.items();
    return this.items().filter((i: Jr) =>
      (i.name || '').toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q)
    );
  });

  constructor() {
    this.load();
    const ok = this.route.snapshot.queryParamMap.get('ok');
    if (ok === 'created') this.showSuccess('Nota creada correctamente.');
    else if (ok === 'updated') this.showSuccess('Nota actualizada correctamente.');
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.service.list().subscribe({
      next: (res: Jr[]) => {
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
    this.service.remove(item.id).subscribe(() => {
      this.showSuccess('Nota eliminada.');
      this.load();
    });
  }

  copy(item: Jr) {
    const text = `${item.name}\n${item.description || ''}`.trim();
    navigator.clipboard?.writeText(text).then(() => this.showSuccess('Copiado al portapapeles.'));
  }

  onQueryChange(v: string) { this.query.set(v); }

  private showSuccess(msg: string) {
    this.success.set(msg);
    setTimeout(() => this.success.set(null), 2500);
    // limpiar query params si venimos con ?ok=
    const qp = this.route.snapshot.queryParamMap;
    if (qp.has('ok')) this.router.navigate([], { queryParams: {} });
  }
}