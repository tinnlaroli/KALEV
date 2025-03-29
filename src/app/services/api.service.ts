import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, throwError, from, forkJoin } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

// ========== INTERFACES ==========
interface Mascota {
  id_animal?: number;
  id_jugador: number;
  nombre_animal: string;
  tipo_animal: string;
}

interface Compra {
  id_compra?: number;
  id_usuario: number;
  id_item: number;
  fecha_compra?: string;
  cantidad: number;
  costo_total: number;
}

interface Estudiante {
  id_estudiante: number;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  correo: string;
  id_grupo: number;
  nombre_grupo: string;
  grado: string;
  monedas?: number;
}

interface LoginResponse {
  success: boolean;
  token: string;
  estudiante: Estudiante;
  message?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://kalev-apiv2-production.up.railway.app/api/v1';
  private authToken: string | null = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.initStorage();
    this.loadAuthToken();
  }

  // ========== STORAGE ==========
  private async initStorage(): Promise<void> {
    await this.storage.create();
  }

  private async loadAuthToken(): Promise<void> {
    this.authToken = await this.storage.get('auth_token');
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (this.authToken) {
      headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    }

    return headers;
  }

  // ========== AUTH METHODS ==========
  login(correo: string, codigoJuego: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login-estudiante`,
      { correo, codigo_juego: codigoJuego }
    ).pipe(
      switchMap(async (response) => {
        if (response.success && response.token) {
          this.authToken = response.token;
          await this.saveAuthData(response.token, response.estudiante);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  async saveAuthData(token: string, estudiante: Estudiante): Promise<void> {
    await this.storage.set('auth_token', token);
    await this.storage.set('current_student', estudiante);
  }

  async getSavedStudent(): Promise<Estudiante | null> {
    return await this.storage.get('current_student');
  }

  async logout(): Promise<void> {
    this.authToken = null;
    await this.storage.remove('auth_token');
    await this.storage.remove('current_student');
  }

  // ========== MASCOTAS ==========
  crearMascota(mascotaData: Omit<Mascota, 'id_animal'>): Observable<Mascota> {
    this.validarDatosMascota(mascotaData);
    
    return from(this.loadAuthToken()).pipe(
      switchMap(() => {
        return this.http.post<Mascota>(
          `${this.baseUrl}/mascotas`,
          mascotaData,
          { headers: this.getAuthHeaders() }
        ).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  obtenerMascotasPorJugador(idJugador: number): Observable<Mascota[]> {
    return from(this.loadAuthToken()).pipe(
      switchMap(() => {
        return this.http.get<Mascota[]>(
          `${this.baseUrl}/mascotas/jugador/${idJugador}`,
          { headers: this.getAuthHeaders() }
        ).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  private validarDatosMascota(data: Mascota): void {
    if (!data.id_jugador || !data.nombre_animal || !data.tipo_animal) {
      throw new Error('Todos los campos son requeridos');
    }

    if (data.nombre_animal.length < 2 || data.nombre_animal.length > 30) {
      throw new Error('El nombre debe tener entre 2 y 30 caracteres');
    }
  }

  // ========== COMPRAS ==========
  realizarCompra(compraData: Omit<Compra, 'id_compra' | 'fecha_compra'>): Observable<Compra> {
    this.validarDatosCompra(compraData);
    
    return from(this.loadAuthToken()).pipe(
      switchMap(() => {
        return this.http.post<Compra>(
          `${this.baseUrl}/comprasItems`,
          compraData,
          { headers: this.getAuthHeaders() }
        ).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  obtenerHistorialCompras(idUsuario: number): Observable<Compra[]> {
    return from(this.loadAuthToken()).pipe(
      switchMap(() => {
        return this.http.get<Compra[]>(
          `${this.baseUrl}/comprasItems/usuario/${idUsuario}`,
          { headers: this.getAuthHeaders() }
        ).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  private validarDatosCompra(data: Omit<Compra, 'id_compra' | 'fecha_compra'>): void {
    if (!data.id_usuario || !data.id_item || !data.cantidad || !data.costo_total) {
      throw new Error('Todos los campos son requeridos');
    }

    if (data.cantidad <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    if (data.costo_total <= 0) {
      throw new Error('El costo total debe ser mayor a 0');
    }
  }

  // ========== STORAGE METHODS ==========
  async saveSelectedPet(pet: Mascota): Promise<void> {
    await this.storage.set('selected_pet', pet);
  }

  async getSelectedPet(): Promise<Mascota | null> {
    return await this.storage.get('selected_pet');
  }

  async saveSelectedAccessories(accessories: { cabeza: any, ojos: any }): Promise<void> {
    await this.storage.set('selected_accessories', accessories);
  }

  async getSelectedAccessories(): Promise<{ cabeza: any, ojos: any } | null> {
    return await this.storage.get('selected_accessories');
  }

  // ========== ERROR HANDLING ==========
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    console.error('HTTP Error:', error);
    return throwError(errorMessage);
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Error del cliente: ${error.error.message}`;
    }

    switch (error.status) {
      case 0: return 'Error de conexión - No se pudo conectar al servidor';
      case 400: return error.error?.message || 'Datos inválidos';
      case 401: return 'No autorizado - Por favor inicie sesión nuevamente';
      case 403: return 'Acceso prohibido - No tiene permisos para esta acción';
      case 404: return 'Recurso no encontrado';
      case 500: return error.error?.message || 'Error interno del servidor';
      default: return `Error HTTP ${error.status}: ${error.message}`;
    }
  }
}