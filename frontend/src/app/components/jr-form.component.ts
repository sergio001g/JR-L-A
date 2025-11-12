import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JrService } from '../jr.service';

@Component({
  selector: 'app-jr-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2 style="margin-bottom:12px;">{{ id ? 'Editar nota' : 'Nueva nota' }}</h2>
    <form [formGroup]="form" (ngSubmit)="submit()" style="display:grid;gap:12px;max-width:480px;">
      <div>
        <label>Nombre</label>
        <input formControlName="name" type="text" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;" />
        <div *ngIf="form.controls.name.touched && form.controls.name.invalid" style="color:#b00020;font-size:12px;margin-top:4px;">
          <span *ngIf="form.controls.name.errors?.['required']">El nombre es obligatorio.</span>
          <span *ngIf="form.controls.name.errors?.['minlength']">Debe tener al menos 2 caracteres.</span>
        </div>
      </div>
      <div>
        <label>Descripción</label>
        <textarea formControlName="description" rows="4" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;"></textarea>
        <div style="text-align:right;color:#777;font-size:12px;margin-top:4px;">{{ (form.controls.description.value || '').length }} caracteres</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button type="submit" [disabled]="form.invalid" style="padding:8px 12px;">Guardar</button>
        <button type="button" (click)="cancel()" style="padding:8px 12px;">Cancelar</button>
      </div>
    </form>
  `
})
export class JrFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(JrService);

  id: number | null = null;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['']
  });

  constructor() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId ? Number(paramId) : null;
    if (this.id) {
      this.service.get(this.id).subscribe((res: any) => this.form.patchValue(res));
    }
  }

  submit() {
    const value = this.form.value as any;
    if (this.id) {
      this.service.update(this.id, value).subscribe(() => this.router.navigate(['/', 'notes'], { queryParams: { ok: 'updated' } }));
    } else {
      this.service.create(value).subscribe(() => this.router.navigate(['/', 'notes'], { queryParams: { ok: 'created' } }));
    }
  }

  cancel() {
    this.router.navigateByUrl('/notes');
  }
}