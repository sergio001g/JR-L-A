import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  body: string;
  created_at?: string;
  user?: { id: number; name: string };
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  private baseUrl = `${environment.apiBaseUrl}/posts`;

  constructor(private http: HttpClient) {}

  list(postId: number) { return this.http.get<Comment[]>(`${this.baseUrl}/${postId}/comments`); }
  create(postId: number, payload: { body: string }) { return this.http.post<Comment>(`${this.baseUrl}/${postId}/comments`, payload); }
}