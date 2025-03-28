// services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL de login
  private apiUrl = 'https://kalev-apiv2-production.up.railway.app/api/v1/login-estudiante';

  // URL api de estudiantes
  private apiEstudiantes = 'https://kalev-apiv2-production.up.railway.app/api/v1/estudiantes';

  // BehaviorSubject para almacenar el ID del estudiante
  private estudianteIdSource = new BehaviorSubject<number | null>(null);
  estudianteId$ = this.estudianteIdSource.asObservable();

  constructor( private http: HttpClient,private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    // Recuperar el ID del estudiante si existe en el almacenamiento
    const storedId = await this.storage.get('estudianteId');
    if (storedId) {
      this.estudianteIdSource.next(storedId);
    }
  }

  /**
   * Método para realizar el login del estudiante
   * @param correo Correo del estudiante
   * @param codigoJuego Código del juego
   * @returns Observable con la respuesta del servidor
   */
  login(correo: string, codigoJuego: string): Observable<any> {
    const body = {
      username: correo,
      password: codigoJuego
    };

    return this.http.post(this.apiUrl, body).pipe(
      tap((response: any) => {
        if (response && response.id_estudiante) {
          this.setEstudianteId(response.id_estudiante);
        }
      })
    );
  }

  /**
   * Método para establecer el ID del estudiante y guardarlo en almacenamiento
   * @param id ID del estudiante
   */
  private async setEstudianteId(id: number) {
    this.estudianteIdSource.next(id);
    await this.storage.set('estudianteId', id);
  }

  /**
   * Método para obtener los datos completos del estudiante
   * @param id ID del estudiante (opcional, usa el almacenado si no se proporciona)
   * @returns Observable con los datos del estudiante
   */
  getDatosEstudiante(id?: number): Observable<any> {
    const estudianteId = id || this.estudianteIdSource.value;
    if (!estudianteId) {
      throw new Error('No hay ID de estudiante disponible');
    }

    return this.http.get(`${this.apiEstudiantes}/${estudianteId}`);
  }

  /**
   * Método para cerrar sesión (limpia el ID del estudiante)
   */
  async logout() {
    this.estudianteIdSource.next(null);
    await this.storage.remove('estudianteId');
  }

  /**
   * Método para verificar si hay un estudiante logueado
   * @returns Promise que resuelve con true si hay un estudiante logueado
   */
  async isLoggedIn(): Promise<boolean> {
    const id = await this.storage.get('estudianteId');
    return !!id;
  }

  /**
   * Método para obtener el ID del estudiante actual
   * @returns Promise con el ID del estudiante o null si no hay sesión
   */
  async getCurrentEstudianteId(): Promise<number | null> {
    return await this.storage.get('estudianteId');
  }
}