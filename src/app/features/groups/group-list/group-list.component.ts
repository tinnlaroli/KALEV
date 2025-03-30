import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from '../../../services/group.service';

interface Group {
  id_grupo?: number;
  nombre_grupo: string;
  grado: string;
  id_director: number;
}

@Component({
  standalone: false,
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  selectedGroup: Group = this.getEmptyGroup();
  newGroup: Group = this.getEmptyGroup();

  isCreateModalOpen = false;
  isEditModalOpen = false;

  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
  toastVisible = false;

  formErrors: { [key: string]: string } = {};
  editFormErrors: { [key: string]: string } = {};

  readonly rol_id = Number(localStorage.getItem('rol_id'));
  readonly user_id = Number(localStorage.getItem('id_usuario'));
  readonly namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9]{2,50}$/;
  readonly gradePattern = /^[0-9]{1,2}(°|º)?\s?[A-Za-z]{0,10}$/;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.validateUserRole();
    this.getGroups();
  }

  private validateUserRole(): void {
    if (![1, 2, 4].includes(this.rol_id)) {
      this.showToast('No tienes permisos para acceder a esta sección', 'error');
    }
  }

  getEmptyGroup(): Group {
    return {
      nombre_grupo: '',
      grado: '',
      id_director: this.user_id
    };
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }

  getGroups(): void {
    let request$;
    
    switch (this.rol_id) {
      case 4: // Superadmin
        request$ = this.groupService.getAll();
        break;
      case 2: // Director
        request$ = this.groupService.getByDirector(this.user_id);
        break;
      case 1: // Docente
        request$ = this.groupService.getByDocente(this.user_id);
        break;
      default:
        this.groups = [];
        return;
    }

    request$.subscribe({
      next: (res: any) => this.groups = res.data || [],
      error: (err) => {
        console.error(err);
        this.showToast('Error al obtener grupos', 'error');
      }
    });
  }

  validateCreateForm(form: NgForm): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.newGroup.nombre_grupo) {
      this.formErrors['nombre'] = 'El nombre del grupo es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.newGroup.nombre_grupo)) {
      this.formErrors['nombre'] = 'El nombre solo puede contener letras, números y espacios (2-50 caracteres)';
      isValid = false;
    }

    if (!this.newGroup.grado) {
      this.formErrors['grado'] = 'El grado es requerido';
      isValid = false;
    } else if (!this.gradePattern.test(this.newGroup.grado)) {
      this.formErrors['grado'] = 'Formato de grado inválido (ej. 1° Primaria)';
      isValid = false;
    }

    return isValid;
  }

  validateEditForm(form: NgForm): boolean {
    this.editFormErrors = {};
    let isValid = true;

    if (!this.selectedGroup.nombre_grupo) {
      this.editFormErrors['editNombre'] = 'El nombre del grupo es requerido';
      isValid = false;
    } else if (!this.namePattern.test(this.selectedGroup.nombre_grupo)) {
      this.editFormErrors['editNombre'] = 'El nombre solo puede contener letras, números y espacios (2-50 caracteres)';
      isValid = false;
    }

    if (!this.selectedGroup.grado) {
      this.editFormErrors['editGrado'] = 'El grado es requerido';
      isValid = false;
    } else if (!this.gradePattern.test(this.selectedGroup.grado)) {
      this.editFormErrors['editGrado'] = 'Formato de grado inválido (ej. 1° Primaria)';
      isValid = false;
    }

    return isValid;
  }

  createGroup(createForm: NgForm): void {
    if (!this.validateCreateForm(createForm)) {
      this.showToast('Por favor corrige los errores en el formulario', 'warning');
      return;
    }

    this.groupService.create(this.newGroup).subscribe({
      next: () => {
        this.showToast('Grupo creado exitosamente', 'success');
        this.getGroups();
        this.closeCreateModal();
        this.newGroup = this.getEmptyGroup();
      },
      error: (err) => {
        console.error(err);
        const message = err.error?.message || 'Error al crear grupo';
        this.showToast(message, 'error');
      }
    });
  }

  editGroup(group: Group): void {
    this.selectedGroup = { ...group };
    this.isEditModalOpen = true;
  }

  updateGroup(editForm: NgForm): void {
    if (!this.validateEditForm(editForm)) {
      this.showToast('Por favor corrige los errores en el formulario', 'warning');
      return;
    }

    if (!this.selectedGroup.id_grupo) {
      this.showToast('ID de grupo inválido', 'error');
      return;
    }

    this.groupService.update(this.selectedGroup.id_grupo, this.selectedGroup).subscribe({
      next: () => {
        this.showToast('Grupo actualizado correctamente', 'success');
        this.getGroups();
        this.closeEditModal();
      },
      error: (err) => {
        console.error(err);
        const message = err.error?.message || 'Error al actualizar grupo';
        this.showToast(message, 'error');
      }
    });
  }

  deleteGroup(id: number): void {
    if (!id || id <= 0) {
      this.showToast('ID de grupo inválido', 'error');
      return;
    }

    const confirmed = confirm('¿Estás seguro de eliminar este grupo? Esta acción no se puede deshacer.');
    if (!confirmed) return;

    this.groupService.delete(id).subscribe({
      next: () => {
        this.showToast('Grupo eliminado correctamente', 'success');
        this.getGroups();
      },
      error: (err) => {
        console.error(err);
        const message = err.error?.message || 'Error al eliminar grupo';
        this.showToast(message, 'error');
      }
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.newGroup = this.getEmptyGroup();
    this.formErrors = {};
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedGroup = this.getEmptyGroup();
    this.editFormErrors = {};
  }

  formatGrade(grado: string): string {
    if (!grado) return '';
    // Formatea grados como "1 Primaria" a "1° Primaria"
    return grado.replace(/(\d+)\s?/, '$1° ');
  }
}