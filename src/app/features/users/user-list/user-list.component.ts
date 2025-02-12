import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = { id: null, name: '', email: '', password: '' };

  // Para el nuevo usuario
  newUser = { name: '', email: '', password: '' }; // Agregar el campo password

  // Variable para controlar la apertura de los modales
  isCreateModalOpen = false;
  isEditModalOpen = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

  // Abrir modal de crear usuario
  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  // Cerrar modal de crear usuario
  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  // Filtra todo lo que no sea letra ni espacio
  filterInvalidCharacters(event: any) {
    // Expresión regular que permite solo letras y espacios
    const regex = /[^a-zA-Z\s]/;
  
    // Si el valor del carácter ingresado no es válido, evitamos la entrada
    if (regex.test(event.key)) {
      event.preventDefault();  // Esto evita que el carácter sea ingresado
    }
  }
  

  // Método para crear usuario
  createUser() {
    console.log('Intentando crear usuario...');
  
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('Por favor complete todos los campos.');
      return;
    }
  
    // Validación de formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.newUser.email)) {
      alert('El correo electrónico no tiene un formato válido.');
      return;
    }
  
    // Validación de la longitud de la contraseña
    if (this.newUser.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    console.log('Datos a enviar:', this.newUser);
  
    this.userService.createUser(this.newUser).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        alert('Usuario creado exitosamente');
        this.getUsers();
        this.closeCreateModal(); // Cerrar el modal al crear el usuario
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
        alert('Ocurrió un error al crear el usuario. Revisa la consola para más detalles.');
      }
    );
  }
  


  // Método para eliminar usuario
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.getUsers(); // Refresca la lista de usuarios
      },
      (error) => {
        console.error('Error al eliminar usuario', error);
      }
    );
  }

  // Método para editar usuario
  editUser(id: number) {
    this.userService.getUserById(id).subscribe(
      (data) => {
        // Pre-llenamos los campos del formulario de editar
        this.selectedUser = data;
        this.isEditModalOpen = true; // Abrir el modal de editar
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  // Cerrar modal de editar usuario
  closeEditModal() {
    this.isEditModalOpen = false;
  }

  // Método para actualizar usuario
  updateUser() {
    console.log('Datos enviados para actualizar:', this.selectedUser);
  
    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
      () => {
        alert('Usuario actualizado exitosamente');
        this.getUsers();
        this.closeEditModal();
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  
}
