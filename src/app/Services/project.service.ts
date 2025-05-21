import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  http = inject(HttpClient);
  private model = 'project.project';
  getProjects(): Observable<any> {
    return this.http.post(
      `/api/web/dataset/call_kw/project.project/search_read`,
      {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: this.model,
          method: 'search_read',
          args: [],
          kwargs: {
            domain: [],
            fields: ['id', 'name', 'description', 'task_count'],
            limit: 20,
          },
        },
      }
    );
  }

  createProject(data: any): Observable<any> {
    return this.http.post(`/api/web/dataset/call_kw`, {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        model: this.model,
        method: 'create',
        args: [
          {
            name: data.name,
            description: data.description,
          },
        ],
        kwargs: {},
      },
    });
  }
  updateProject(id: number, data: any): Observable<any> {
    return this.http.post(`/api/web/dataset/call_kw`, {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        model: this.model,
        method: 'write',
        args: [
          [id], // لازم تبعت list فيها الـ ID
          {
            name: data.name,
            description: data.description,
          },
        ],
        kwargs: {},
      },
    });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.post(`/api/web/dataset/call_kw`, {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        model: this.model,
        method: 'unlink',
        args: [[id]],
        kwargs: {},
      },
    });
  }
}
