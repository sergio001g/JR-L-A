import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Post {
  id: number;
  title: string;
  body?: string;
  author_id?: number;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = `${environment.apiBaseUrl}/posts`;

  constructor(private http: HttpClient) {}

  list() { return this.http.get<Post[]>(this.baseUrl); }
  get(id: number) { return this.http.get<Post>(`${this.baseUrl}/${id}`); }
  create(payload: Partial<Post>) { return this.http.post<Post>(this.baseUrl, payload); }
}