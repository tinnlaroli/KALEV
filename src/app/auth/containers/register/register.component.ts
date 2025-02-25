import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public form: FormGroup;
  public error = '';
  isSubmited = false;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public onSubmit() {
    this.isSubmited = true;

    if (this.form.invalid) {
      return;
    }

    const body = {
      name: this.form.value.name,
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password
    };

    this._authService.register(body).pipe(
      tap(() => {
        alert('Cuenta creada con éxito, ahora inicia sesión.');
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    ).subscribe();
  }

  private handleError(error: any) {
    if (error.status === 400) {
      this.error = 'Datos inválidos. Por favor, verifica la información.';
    } else if (error.status === 409) {
      this.error = 'El correo ya está registrado.';
    } else {
      this.error = 'Error en el registro. Intenta de nuevo.';
    }

    console.error('Error en el registro:', error);

    setTimeout(() => {
      this.error = '';
    }, 5000);
  }
}