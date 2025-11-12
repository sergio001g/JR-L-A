import { Routes } from '@angular/router';
import { JrListComponent } from './components/jr-list.component';
import { JrFormComponent } from './components/jr-form.component';
import { BlogComponent } from './components/blog.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: JrListComponent },
  { path: 'notes/new', component: JrFormComponent },
  { path: 'notes/:id/edit', component: JrFormComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Rutas antiguas como alias
  { path: 'jrs', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'jrs/new', redirectTo: '/notes/new', pathMatch: 'full' },
  { path: 'jrs/:id/edit', redirectTo: '/notes/:id/edit', pathMatch: 'full' },
];
