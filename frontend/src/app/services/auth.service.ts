import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(payload: { name: string; email: string; password: string }) {
    return this.http.post<{ user: any; token: string }>(`${this.baseUrl}/register`, payload);
  }

  login(payload: { email: string; password: string }) {
    return this.http.post<{ user: any; token: string }>(`${this.baseUrl}/login`, payload);
  }

  me() {
    return this.http.get<any>(`${this.baseUrl}/me`);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}