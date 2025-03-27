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
  newUser = { name: '', email: '', password: '' };

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
      const roles = [1, 2, 3 ,4]; // Si quieres incluir otros superadmins, agrega 4
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
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password)
      return;

    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        alert('Usuario creado');
        this.getUsers();
        this.closeCreateModal();
        this.newUser = { name: '', email: '', password: '' };
      },
      error: (err) => console.error('Error al crear usuario:', err),
    });
  }

  editUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.selectedUser = {
          id: data.id_usuario,
          name: data.nombre_usuario,
          email: data.correo,
        };
        this.isEditModalOpen = true;
      },
      error: (err) =>
        console.error('Error al obtener los datos del usuario', err),
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe({
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
    this.isEditModalOpen = false;
  }
}
