import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: false,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = { id: null, name: '', email: '', password: '' };
  newUser = {
    nombre_usuario: '',
    ap_paterno: '',
    ap_materno: '',
    correo: '',
    telefono: '',
    contrasenia: '',
    id_rol: 3, // Rol por defecto de tutor(permisos)
  };

  isCreateModalOpen = false;
  isEditModalOpen = false;

  rol_id = Number(localStorage.getItem('rol_id'));

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    if (!this.rol_id) return;

    if (this.rol_id === 4) {
      // Superadmin: ver todos los usuarios de todos los roles
      const roles = [1, 2, 3, 4]; // Si quieres incluir otros superadmins, agrega 4
      this.users = []; // Asegúrate de limpiar antes

      roles.forEach((roleId) => {
        this.userService.getUsersByRole(roleId).subscribe({
          next: (res) => {
            if (res.data) {
              this.users = [...this.users, ...res.data];
              console.log(`Usuarios con rol ${roleId}:`, res.data);
            }
          },
          error: (err) =>
            console.error(`Error al obtener usuarios con rol ${roleId}:`, err),
        });
      });
    } else {
      // Otros roles: solo los usuarios que les corresponden
      this.userService.getUsersByRole(this.rol_id).subscribe({
        next: (res) => {
          console.log('Usuarios recibidos:', res.data);
          this.users = res.data;
        },
        error: (err) => console.error('Error al obtener usuarios:', err),
      });
    }
  }

  createUser() {
    if (
      !this.newUser.nombre_usuario ||
      !this.newUser.correo ||
      !this.newUser.contrasenia ||
      !this.newUser.id_rol ||
      !this.newUser.ap_paterno ||
      !this.newUser.ap_materno ||
      !this.newUser.telefono
    ) {
      alert('Faltan datos');
      return;
    }
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        alert('Usuario creado');
        this.getUsers();
        this.closeCreateModal();
        this.newUser = {
          nombre_usuario: '',
          ap_paterno: '',
          ap_materno: '',
          correo: '',
          telefono: '',
          contrasenia: '',
          id_rol: 1,
        };
      },
      error: (err) => console.error('Error al crear usuario:', err),
    });
  }

  editUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        console.log('Datos del usuario:', data.data);
        this.selectedUser = {
          id_usuario: data.data.id_usuario,
          nombre_usuario: data.data.nombre_usuario,
          ap_paterno: data.data.ap_paterno,
          ap_materno: data.data.ap_materno,
          correo: data.data.correo,
          telefono: data.data.telefono,
          contrasenia: data.data.contrasenia,
          id_rol: 1,
        };
        this.isEditModalOpen = true;
      },
      error: (err) =>
        console.error('Error al obtener los datos del usuario', err),
    });
  }

  updateUser() {
    const id = this.selectedUser.id_usuario;

    if (!id) {
      alert('ID de usuario no válido');
      return;
    }

    if (
      !this.selectedUser.nombre_usuario ||
      !this.selectedUser.ap_paterno ||
      !this.selectedUser.ap_materno ||
      !this.selectedUser.correo ||
      !this.selectedUser.telefono ||
      !this.selectedUser.contrasenia
    ) {
      alert('Faltan datos para actualizar');
      return;
    }

    const updateData = {
      nombre_usuario: this.selectedUser.nombre_usuario,
      ap_paterno: this.selectedUser.ap_paterno,
      ap_materno: this.selectedUser.ap_materno,
      correo: this.selectedUser.correo,
      telefono: this.selectedUser.telefono,
      contrasenia: this.selectedUser.contrasenia,
      id_rol: this.selectedUser.id_rol,
    };

    this.userService.updateUser(id, updateData).subscribe({
      next: () => {
        alert('Usuario actualizado');
        this.getUsers();
        this.closeEditModal();
      },
      error: (err) => console.error('Error al actualizar usuario:', err),
    });
  }

  deleteUser(id: number) {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => this.getUsers(),
      error: (err) => console.error('Error al eliminar usuario:', err),
    });
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  closeEditModal() {
    this.selectedUser = {
      id_usuario: null,
      nombre_usuario: '',
      ap_paterno: '',
      ap_materno: '',
      correo: '',
      telefono: '',
      contrasenia: '',
    };
    this.isEditModalOpen = false;
  }
}
