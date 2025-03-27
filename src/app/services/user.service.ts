import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios por rol (recomendado según tu API)
  getUsersByRole(roleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rol/${roleId}`);
  }

  // Obtener un usuario por su ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario (registro)
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  // Actualizar un usuario
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  // Eliminar usuario si lo agregas después
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
