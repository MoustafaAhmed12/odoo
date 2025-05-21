// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'sssaaa.odoo.com';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userDataSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // التحقق من وجود بيانات الجلسة
    const sessionData = localStorage.getItem('odoo_session');
    if (sessionData) {
      this.isAuthenticatedSubject.next(true);
      this.userDataSubject.next(JSON.parse(sessionData));
    }
  }

  login(username: string, password: string, db: string): Observable<any> {
    return this.http
      .post(`/api/web/session/authenticate`, {
        jsonrpc: '2.0',
        params: {
          db: db,
          login: username,
          password: password,
        },
      })
      .pipe(
        tap((response: any) => {
          if (response.result) {
            localStorage.setItem(
              'odoo_session',
              JSON.stringify(response.result)
            );
            this.isAuthenticatedSubject.next(true);
            this.userDataSubject.next(response.result);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('odoo_session');
    this.isAuthenticatedSubject.next(false);
    this.userDataSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }
}
