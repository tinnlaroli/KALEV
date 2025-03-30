import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = this.getEmptyUser();
  newUser: User = this.getEmptyUser(3); // Rol por defecto: tutor

  isCreateModalOpen = false;
  isEditModalOpen = false;

  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
  toastVisible = false;

  formErrors: { [key: string]: string } = {};
  editFormErrors: { [key: string]: string } = {};

  readonly rol_id = Number(localStorage.getItem('rol_id'));
  readonly phonePattern = /^[0-9]{10}$/;
  readonly namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
  readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  readonly passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (!this.rol_id || this.rol_id < 1 || this.rol_id > 4) {
      this.showToast('No tienes permisos para acceder a esta sección', 'error');
      return;
    }
    this.getUsers();
  }

  public formatPhone(phone: string): string {
    if (!phone || phone.length !== 10) return phone;
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
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
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
      this.toastMessage = '';
    }, 3000);
  }

  getUsers(): void {
    if (!this.rol_id) return;

    let allowedRoles: number[] = [];

    switch (this.rol_id) {
      case 4: // Superadmin
        allowedRoles = [1, 2, 3, 4];
        break;
      case 2: // Director
        allowedRoles = [1, 3];
        break;
      case 1: // Docente
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
        error: (err) => {
          console.error(err);
          this.showToast(`Error al obtener usuarios con rol ${roleId}`, 'error');
        }
      });
    });
  }

  validateCreateForm(form: NgForm): boolean {
    this.formErrors = {};
    let isValid = true;

    // Validación de nombre
    if (!this.newUser.nombre_usuario) {
      this.formErrors['nombre'] = 'El nombre es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.newUser.nombre_usuario)) {
      this.formErrors['nombre'] = 'El nombre solo debe contener letras y espacios (2-50 caracteres)';
      isValid = false;
    }

    // Validación de apellido paterno
    if (!this.newUser.ap_paterno) {
      this.formErrors['apPaterno'] = 'El apellido paterno es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.newUser.ap_paterno)) {
      this.formErrors['apPaterno'] = 'El apellido solo debe contener letras y espacios (2-50 caracteres)';
      isValid = false;
    }

    // Validación de apellido materno
    if (!this.newUser.ap_materno) {
      this.formErrors['apMaterno'] = 'El apellido materno es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.newUser.ap_materno)) {
      this.formErrors['apMaterno'] = 'El apellido solo debe contener letras y espacios (2-50 caracteres)';
      isValid = false;
    }

    // Validación de correo
    if (!this.newUser.correo) {
      this.formErrors['correo'] = 'El correo es requerido';
      isValid = false;
    } else if (!this.emailPattern.test(this.newUser.correo)) {
      this.formErrors['correo'] = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    // Validación de teléfono
    if (!this.newUser.telefono) {
      this.formErrors['telefono'] = 'El teléfono es requerido';
      isValid = false;
    } else if (!this.phonePattern.test(this.newUser.telefono)) {
      this.formErrors['telefono'] = 'El teléfono debe tener 10 dígitos';
      isValid = false;
    }

    // Validación de contraseña
    if (!this.newUser.contrasenia) {
      this.formErrors['password'] = 'La contraseña es requerida';
      isValid = false;
    } else if (this.newUser.contrasenia.length < 6) {
      this.formErrors['password'] = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    } else if (!this.passwordPattern.test(this.newUser.contrasenia)) {
      this.formErrors['password'] = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
      isValid = false;
    }

    // Validación de rol
    if (!this.newUser.id_rol) {
      this.formErrors['rol'] = 'El rol es requerido';
      isValid = false;
    } else if (!this.canCreateUser(this.newUser.id_rol)) {
      this.formErrors['rol'] = 'No tienes permiso para crear este tipo de usuario';
      isValid = false;
    }

    return isValid;
  }

  validateEditForm(form: NgForm): boolean {
    this.editFormErrors = {};
    let isValid = true;

    // Validación de nombre
    if (!this.selectedUser.nombre_usuario) {
      this.editFormErrors['editName'] = 'El nombre es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.selectedUser.nombre_usuario)) {
      this.editFormErrors['editName'] = 'El nombre solo debe contener letras y espacios (2-50 caracteres)';
      isValid = false;
    }

    // Validación de apellido paterno
    if (!this.selectedUser.ap_paterno) {
      this.editFormErrors['editApPaterno'] = 'El apellido paterno es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.selectedUser.ap_paterno)) {
      this.editFormErrors['editApPaterno'] = 'El apellido solo debe contener letras y espacios (2-50 caracteres)';
      isValid = false;
    }

    // Validación de apellido materno
    if (!this.selectedUser.ap_materno) {
      this.editFormErrors['editApMaterno'] = 'El apellido materno es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.selectedUser.ap_materno)) {
      this.editFormErrors['editApMaterno'] = 'El apellido solo debe contener letras y espacios (2-50 caracteres)';
      isValid = false;
    }

    // Validación de correo
    if (!this.selectedUser.correo) {
      this.editFormErrors['editEmail'] = 'El correo es requerido';
      isValid = false;
    } else if (!this.emailPattern.test(this.selectedUser.correo)) {
      this.editFormErrors['editEmail'] = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    // Validación de teléfono
    if (!this.selectedUser.telefono) {
      this.editFormErrors['editTelefono'] = 'El teléfono es requerido';
      isValid = false;
    } else if (!this.phonePattern.test(this.selectedUser.telefono)) {
      this.editFormErrors['editTelefono'] = 'El teléfono debe tener 10 dígitos';
      isValid = false;
    }

    // Validación de rol
    if (!this.selectedUser.id_rol) {
      this.editFormErrors['editRol'] = 'El rol es requerido';
      isValid = false;
    } else if (!this.canEditUser(this.selectedUser.id_rol)) {
      this.editFormErrors['editRol'] = 'No tienes permiso para asignar este rol';
      isValid = false;
    }

    return isValid;
  }

  createUser(createForm: NgForm): void {
    if (!this.validateCreateForm(createForm)) {
      this.showToast('Por favor corrige los errores en el formulario', 'warning');
      return;
    }

    if (!this.canCreateUser(this.newUser.id_rol)) {
      this.showToast('No tienes permiso para crear este tipo de usuario', 'warning');
      return;
    }

    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.showToast('Usuario creado exitosamente', 'success');
        this.getUsers();
        this.closeCreateModal();
        this.newUser = this.getEmptyUser(3);
      },
      error: (err) => {
        console.error(err);
        if (err.error && err.error.message) {
          this.showToast(err.error.message, 'error');
        } else {
          this.showToast('Error al crear usuario', 'error');
        }
      }
    });
  }

  editUser(id: number): void {
    if (!id || id <= 0) {
      this.showToast('ID de usuario inválido', 'error');
      return;
    }

    this.userService.getUserById(id).subscribe({
      next: ({ data }) => {
        if (!data) {
          this.showToast('Usuario no encontrado', 'error');
          return;
        }
        this.selectedUser = { ...data };
        this.isEditModalOpen = true;
      },
      error: (err) => {
        console.error(err);
        this.showToast('Error al obtener datos del usuario', 'error');
      }
    });
  }

  updateUser(editForm: NgForm): void {
    const { id_usuario } = this.selectedUser;

    if (!id_usuario || id_usuario <= 0) {
      this.showToast('ID de usuario inválido', 'error');
      return;
    }

    if (!this.validateEditForm(editForm)) {
      this.showToast('Por favor corrige los errores en el formulario', 'warning');
      return;
    }

    this.userService.updateUser(id_usuario, this.selectedUser).subscribe({
      next: () => {
        this.showToast('Usuario actualizado correctamente', 'success');
        this.getUsers();
        this.closeEditModal();
      },
      error: (err) => {
        console.error(err);
        if (err.error && err.error.message) {
          this.showToast(err.error.message, 'error');
        } else {
          this.showToast('Error al actualizar usuario', 'error');
        }
      }
    });
  }

  deleteUser(id: number): void {
    if (!id || id <= 0) {
      this.showToast('ID de usuario inválido', 'error');
      return;
    }

    const confirmed = confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.');
    if (!confirmed) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.showToast('Usuario eliminado correctamente', 'success');
        this.getUsers();
      },
      error: (err) => {
        console.error(err);
        if (err.error && err.error.message) {
          this.showToast(err.error.message, 'error');
        } else {
          this.showToast('Error al eliminar usuario', 'error');
        }
      }
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.newUser = this.getEmptyUser(3);
    this.formErrors = {};
  }

  closeEditModal(): void {
    this.selectedUser = this.getEmptyUser();
    this.isEditModalOpen = false;
    this.editFormErrors = {};
  }

  public canCreateUser(idRol: number): boolean {
    if (this.rol_id === 4) return true; // Superadmin puede crear cualquier rol
    if (this.rol_id === 2) return [1, 3].includes(idRol); // Director puede crear docentes y tutores
    if (this.rol_id === 1) return idRol === 3; // Docente solo puede crear tutores
    return false;
  }

  public canEditUser(idRol: number): boolean {
    if (this.rol_id === 4) return true; // Superadmin puede editar cualquier rol
    if (this.rol_id === 2) return [1, 3].includes(idRol); // Director puede editar docentes y tutores
    if (this.rol_id === 1) return idRol === 3; // Docente solo puede editar tutores
    return false;
  }

  getRoleName(id_rol: number): string {
    switch (id_rol) {
      case 1: return 'Docente';
      case 2: return 'Director';
      case 3: return 'Tutor';
      case 4: return 'Superadmin';
      default: return 'Desconocido';
    }
  }
}