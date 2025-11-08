import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Jr {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class JrService {
  private baseUrl = 'http://127.0.0.1:8000/api/jrs';

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