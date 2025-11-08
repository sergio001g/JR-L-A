import { Routes } from '@angular/router';
import { JrListComponent } from './components/jr-list.component';
import { JrFormComponent } from './components/jr-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/jrs', pathMatch: 'full' },
  { path: 'jrs', component: JrListComponent },
  { path: 'jrs/new', component: JrFormComponent },
  { path: 'jrs/:id/edit', component: JrFormComponent },
];
