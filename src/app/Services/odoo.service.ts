// src/app/services/odoo.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OdooService {
  http = inject(HttpClient);

  getProjects(): Observable<any> {
    return this.http.post(
      `/api/web/dataset/call_kw/project.project/search_read`,
      {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'project.project',
          method: 'search_read',
          args: [],
          kwargs: {
            domain: [],
            fields: ['id', 'name', 'description'],
            limit: 20,
          },
        },
      }
    );
  }

  createProject(name: string): Observable<any> {
    return this.http.post(`/api/web/dataset/call_kw/project.project/create`, {
      jsonrpc: '2.0',
      params: {
        model: 'project.project',
        fields: { name },
      },
    });
  }

  // updateProject(id: number, name: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/web/dataset/write`, {
  //     jsonrpc: '2.0',
  //     params: {
  //       model: 'project.project',
  //       ids: [id],
  //       fields: { name },
  //     },
  //   });
  // }

  // deleteProject(id: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/web/dataset/unlink`, {
  //     jsonrpc: '2.0',
  //     params: {
  //       model: 'project.project',
  //       ids: [id],
  //     },
  //   });
  // }
}
