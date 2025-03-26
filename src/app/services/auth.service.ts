import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/usuarios/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { correo: string, contrasenia: string }) {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  setUser(user: any) {
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  getUser() {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  getRol(): number | null {
    const user = this.getUser();
    return user?.id_rol || null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  hasRole(rolesPermitidos: number[]): boolean {
    const user = this.getUser();
    return user && rolesPermitidos.includes(user.id_rol);
  }
  
}
