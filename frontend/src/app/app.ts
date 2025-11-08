import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <nav style="padding:12px;border-bottom:1px solid #eee;display:flex;gap:12px;">
      <a routerLink="/jrs">Jr</a>
      <a routerLink="/jrs/new">Nuevo</a>
    </nav>
    <div style="padding:12px;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {
}
