import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = `${environment.apiUrl}/actividades`;

  constructor(private http: HttpClient) {}

  getActivitiesByStudent(idEstudiante: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estudiante/${idEstudiante}`);
  }

  createActivity(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getAllActivities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getActivityById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateActivity(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteActivity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
