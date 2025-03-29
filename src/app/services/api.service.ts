import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

interface Estudiante {
  id_estudiante: number;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  correo: string;
  id_grupo: number;
  nombre_grupo: string;
  grado: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  estudiante: Estudiante;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://kalev-apiv2-production.up.railway.app/api/v1/login-estudiante';
  private apiEstudiantes = 'https://kalev-apiv2-production.up.railway.app/api/v1/estudiantes';

  constructor(private http: HttpClient, private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  login(correo: string, codigoJuego: string): Observable<LoginResponse> {
    const body = {
      correo: correo,
      codigo_juego: codigoJuego
    };
    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      catchError(this.handleError)
    );
  }

  async saveAuthData(token: string, estudiante: Estudiante) {
    await this.storage.set('auth_token', token);
    await this.storage.set('current_student', estudiante);
  }

  async getSavedStudent(): Promise<Estudiante | null> {
    return await this.storage.get('current_student');
  }

  getDatosEstudiante(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiEstudiantes}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMessage = error.error.message || 'Credenciales incorrectas o formato inválido';
      } else if (error.status === 404) {
        errorMessage = 'Endpoint no encontrado';
      } else if (error.status >= 500) {
        errorMessage = 'Error en el servidor. Por favor intente más tarde.';
      }
    }
    return throwError(errorMessage);
  }
}