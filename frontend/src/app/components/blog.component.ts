import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService, Post } from '../services/post.service';
import { CommentService, Comment } from '../services/comment.service';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>JR Blog</h2>
    <p class="muted">Bienvenido. Di hola al blog y deja tu comentario.</p>

    <div *ngIf="!user" class="row" style="margin:8px 0;">
      <span>Para comentar: </span>
      <a routerLink="/login" class="link">Acceder</a>
      <span> o </span>
      <a routerLink="/register" class="link">Crear cuenta</a>
    </div>

    <div class="grid" style="grid-template-columns: 260px 1fr; align-items: start;">
      <aside>
        <div class="row" style="justify-content: space-between; margin-bottom: 8px;">
          <strong>Posts</strong>
          <button class="btn" (click)="toggleNewPost()" *ngIf="user">{{ showNewPost ? 'Cerrar' : 'Nuevo' }}</button>
        </div>
        <div *ngIf="showNewPost" class="card" style="margin-bottom: 12px;">
          <form (ngSubmit)="createPost()" class="grid">
            <input class="input" name="title" [(ngModel)]="newPostTitle" placeholder="Título" required minlength="2" />
            <textarea name="body" [(ngModel)]="newPostBody" class="input" rows="3" placeholder="Contenido"></textarea>
            <button class="btn primary" type="submit">Publicar</button>
            <p *ngIf="postError" style="color:#b91c1c;">{{postError}}</p>
          </form>
        </div>
        <div *ngIf="posts.length === 0" class="muted">No hay posts aún.</div>
        <ul style="list-style:none;padding:0;margin:0;">
          <li *ngFor="let p of posts" (click)="selectPost(p)" class="card" style="margin-bottom:8px;cursor:pointer;">
            <div style="font-weight:600;">{{ p.title }}</div>
            <div class="badge">{{ p.created_at | date:'medium' }}</div>
          </li>
        </ul>
      </aside>

      <section *ngIf="post" class="card">
        <h3 style="margin-top:0;">{{post.title}}</h3>
        <p>{{post.body}}</p>

        <div style="margin:16px 0;">
          <h4>Comentarios</h4>
          <div *ngIf="comments.length === 0">Sé el primero en comentar.</div>
          <ul style="list-style:none;padding:0;">
            <li *ngFor="let c of comments" style="border-bottom:1px solid #eee;padding:8px 0;">
              <strong>{{c.user?.name ?? 'Usuario'}}</strong>:
              <span>{{c.body}}</span>
            </li>
          </ul>
        </div>

        <form *ngIf="user" (ngSubmit)="addComment()" class="grid" style="max-width:600px;">
          <textarea [(ngModel)]="newBody" name="body" required rows="3" placeholder="Escribe tu comentario" class="input"></textarea>
          <button class="btn primary" type="submit">Enviar</button>
          <p *ngIf="error" style="color:#b91c1c;">{{error}}</p>
          <p *ngIf="success" style="color:#15803d;">Comentario publicado</p>
        </form>
      </section>
    </div>
  `
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];
  post: Post | null = null;
  comments: Comment[] = [];
  newBody = '';
  error = '';
  success = false;
  user: any = null;
  showNewPost = false;
  newPostTitle = '';
  newPostBody = '';
  postError = '';

  constructor(private postsService: PostService, private commentsService: CommentService) {}

  ngOnInit() {
    this.user = this.getUser();
    this.loadPosts();
  }

  private getUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  private loadPosts() {
    this.postsService.list().subscribe({
      next: (list: Post[]) => {
        this.posts = list;
        if (!this.post && list.length > 0) {
          this.post = list[0];
          this.loadComments();
        }
        if (list.length === 0 && this.user) {
          this.postsService.create({ title: 'Hola Blog', body: 'Este es el post de bienvenida.' }).subscribe({
            next: (created: Post) => { this.posts = [created]; this.post = created; this.loadComments(); },
            error: () => { this.error = 'No se pudo crear el post.'; }
          });
        }
      }
    });
  }

  private loadComments() {
    if (!this.post) return;
    this.commentsService.list(this.post.id).subscribe({
      next: (res: Comment[]) => this.comments = res
    });
  }

  addComment() {
    if (!this.post) return;
    this.error = '';
    this.success = false;
    this.commentsService.create(this.post.id, { body: this.newBody }).subscribe({
      next: (c: Comment) => {
        this.comments.unshift(c);
        this.newBody = '';
        this.success = true;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'No se pudo publicar el comentario';
        this.success = false;
      }
    });
  }

  selectPost(p: Post) {
    this.post = p;
    this.error = '';
    this.success = false;
    this.loadComments();
  }

  toggleNewPost() {
    this.showNewPost = !this.showNewPost;
    this.postError = '';
  }

  createPost() {
    if (!this.user) return;
    this.postError = '';
    this.postsService.create({ title: this.newPostTitle, body: this.newPostBody }).subscribe({
      next: (created: Post) => {
        this.posts.unshift(created);
        this.selectPost(created);
        this.newPostTitle = '';
        this.newPostBody = '';
        this.showNewPost = false;
      },
      error: (err: any) => this.postError = err?.error?.message || 'No se pudo crear el post'
    });
  }
}