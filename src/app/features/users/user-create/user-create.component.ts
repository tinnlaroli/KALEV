import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  newUser = { nombre: '', correo: '', password: '' }; // Agregar el campo password

  constructor(private userService: UserService, private router: Router) {}

  createUser() {
    if (this.newUser.nombre && this.newUser.correo && this.newUser.password) {
      this.userService.createUser(this.newUser).subscribe(
        () => {
          alert('Usuario creado exitosamente');
          this.router.navigate(['/users']);  // Redirige a la lista de usuarios después de crear
        },
        (error) => {
          console.error('Error al crear el usuario', error);
        }
      );
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  goBack() {
    this.router.navigate(['/users']);  // Redirige a la lista de usuarios
  }
}

