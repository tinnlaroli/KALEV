import { Component, OnInit } from '@angular/core';
import { Group } from '../../../models/group.model';
import { GroupService } from '../../../services/group.service';
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

  readonly rol_id = Number(localStorage.getItem('rol_id'));
  readonly user_id = Number(localStorage.getItem('id_usuario'));

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getEmptyGroup(): Group {
    return {
      nombre_grupo: '',
      grado: '',
      id_director: this.user_id
    };
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3000);
  }

  getGroups(): void {
    if (this.rol_id === 4) {
      this.groupService.getAll().subscribe({
        next: (res: any) => this.groups = res.data || [],
        error: () => this.showToast('Error al obtener grupos', 'error')
      });
    } else if (this.rol_id === 2) {
      this.groupService.getByDirector(this.user_id).subscribe({
        next: (res: any) => this.groups = res.data || [],
        error: () => this.showToast('Error al obtener grupos', 'error')
      });
    } else if (this.rol_id === 1) {
      this.groupService.getByDocente(this.user_id).subscribe({
        next: (res: any) => this.groups = res.data || [],
        error: () => this.showToast('Error al obtener grupos', 'error')
      });
    } else {
      this.groups = [];
    }
  }

  createGroup(): void {
    if (!this.newGroup.nombre_grupo || !this.newGroup.grado) {
      this.showToast('Faltan datos', 'warning');
      return;
    }

    this.groupService.create(this.newGroup).subscribe({
      next: () => {
        this.showToast('Grupo creado', 'success');
        this.getGroups();
        this.closeCreateModal();
        this.newGroup = this.getEmptyGroup();
      },
      error: () => this.showToast('Error al crear grupo', 'error')
    });
  }

  editGroup(group: Group): void {
    this.selectedGroup = { ...group };
    this.isEditModalOpen = true;
  }

  updateGroup(): void {
    if (!this.selectedGroup.id_grupo || !this.selectedGroup.nombre_grupo || !this.selectedGroup.grado) {
      this.showToast('Faltan datos para actualizar', 'warning');
      return;
    }

    this.groupService.update(this.selectedGroup.id_grupo, this.selectedGroup).subscribe({
      next: () => {
        this.showToast('Grupo actualizado', 'success');
        this.getGroups();
        this.closeEditModal();
      },
      error: () => this.showToast('Error al actualizar grupo', 'error')
    });
  }

  deleteGroup(id: number): void {
    if (!confirm('¿Eliminar este grupo?')) return;

    this.groupService.delete(id).subscribe({
      next: () => {
        this.showToast('Grupo eliminado', 'success');
        this.getGroups();
      },
      error: () => this.showToast('Error al eliminar grupo', 'error')
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.newGroup = this.getEmptyGroup();
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedGroup = this.getEmptyGroup();
  }
}
