import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

interface User {
  id_usuario?: number;
  nombre_usuario: string;
  ap_paterno: string;
  ap_materno: string;
  correo: string;
  telefono: string;
  contrasenia: string;
  id_rol: number;
}

@Component({
  standalone: false,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = this.getEmptyUser();
  newUser: User = this.getEmptyUser(3); // Rol por defecto: tutor

  isCreateModalOpen = false;
  isEditModalOpen = false;

  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';

  readonly rol_id = Number(localStorage.getItem('rol_id'));

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getEmptyUser(defaultRol = 1): User {
    return {
      nombre_usuario: '',
      ap_paterno: '',
      ap_materno: '',
      correo: '',
      telefono: '',
      contrasenia: '',
      id_rol: defaultRol,
    };
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => (this.toastMessage = ''), 3000);
  }

  getUsers(): void {
    if (!this.rol_id) return;

    let allowedRoles: number[] = [];

    switch (this.rol_id) {
      case 4:
        allowedRoles = [1, 2, 3, 4];
        break;
      case 2:
        allowedRoles = [1, 3];
        break;
      case 1:
        allowedRoles = [3];
        break;
      default:
        this.users = [];
        return;
    }

    this.users = [];
    allowedRoles.forEach((roleId) => {
      this.userService.getUsersByRole(roleId).subscribe({
        next: (res) => {
          if (res.data) {
            this.users = [...this.users, ...res.data];
          }
        },
        error: () =>
          this.showToast(`Error al obtener usuarios con rol ${roleId}`, 'error'),
      });
    });
  }

  createUser(): void {
    if (!this.canCreateUser(this.newUser.id_rol)) {
      this.showToast('No puedes crear ese tipo de usuario', 'warning');
      return;
    }

    if (this.hasEmptyFields(this.newUser)) {
      this.showToast('Faltan datos', 'warning');
      return;
    }

    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.showToast('Usuario creado exitosamente', 'success');
        this.getUsers();
        this.closeCreateModal();
        this.newUser = this.getEmptyUser(3);
      },
      error: () => this.showToast('Error al crear usuario', 'error'),
    });
  }

  editUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: ({ data }) => {
        this.selectedUser = { ...data };
        this.isEditModalOpen = true;
      },
      error: () => this.showToast('Error al obtener datos del usuario', 'error'),
    });
  }

  updateUser(): void {
    const { id_usuario } = this.selectedUser;

    if (!id_usuario) {
      this.showToast('ID de usuario inválido', 'error');
      return;
    }

    if (this.hasEmptyFields(this.selectedUser)) {
      this.showToast('Faltan datos para actualizar', 'warning');
      return;
    }

    this.userService.updateUser(id_usuario, this.selectedUser).subscribe({
      next: () => {
        this.showToast('Usuario actualizado correctamente', 'success');
        this.getUsers();
        this.closeEditModal();
      },
      error: () => this.showToast('Error al actualizar usuario', 'error'),
    });
  }

  deleteUser(id: number): void {
    const confirmed = confirm('¿Eliminar este usuario?');
    if (!confirmed) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.showToast('Usuario eliminado', 'success');
        this.getUsers();
      },
      error: () => this.showToast('Error al eliminar usuario', 'error'),
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.newUser = this.getEmptyUser(3);
  }

  closeEditModal(): void {
    this.selectedUser = this.getEmptyUser();
    this.isEditModalOpen = false;
  }

  private canCreateUser(idRol: number): boolean {
    if (this.rol_id === 2) return [1, 3].includes(idRol);
    if (this.rol_id === 1) return idRol === 3;
    return false;
  }

  private hasEmptyFields(user: User): boolean {
    return (
      !user.nombre_usuario ||
      !user.ap_paterno ||
      !user.ap_materno ||
      !user.correo ||
      !user.telefono ||
      !user.contrasenia
    );
  }
}
