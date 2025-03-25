import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles: number[] = next.data['roles'];
    const userRol = this.authService.getRol();

    if (userRol !== null && expectedRoles.includes(userRol)) {
      return true;
    } else {
      this.router.navigate(['/dashboard']); // o una ruta de acceso restringido
      return false;
    }
  }
}
