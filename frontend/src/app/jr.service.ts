import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Jr {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class JrService {
  private baseUrl = `${environment.apiBaseUrl}/jrs`;

  constructor(private http: HttpClient) {}

  list(): Observable<Jr[]> {
    return this.http.get<Jr[]>(this.baseUrl);
  }

  get(id: number): Observable<Jr> {
    return this.http.get<Jr>(`${this.baseUrl}/${id}`);
  }

  create(data: Jr): Observable<Jr> {
    return this.http.post<Jr>(this.baseUrl, data);
  }

  update(id: number, data: Partial<Jr>): Observable<Jr> {
    return this.http.put<Jr>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}