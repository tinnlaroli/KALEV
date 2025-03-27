import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const API = `${environment.apiUrl}/grupos`;

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${API}`);
  }

  getByDirector(id: number) {
    return this.http.get(`${API}/director/${id}`);
  }

  getByDocente(id: number) {
    return this.http.get(`${API}/docente/${id}`);
  }

  create(group: any) {
    return this.http.post(API, group);
  }

  update(id: number, group: any) {
    return this.http.put(`${API}/${id}`, group);
  }

  delete(id: number) {
    return this.http.delete(`${API}/${id}`);
  }
}
