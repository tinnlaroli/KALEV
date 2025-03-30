import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../services/activity.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  actividades: any[] = [];
  newActivity: any = {
    nombre_actividad: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: ''
  };
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
  isCreateModalOpen: boolean = false;

  constructor(private activityService: ActivityService, private router: Router) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  // Cargar todas las actividades
  loadActivities() {
    this.activityService.getAllActivities().subscribe(
      (response) => {
        this.actividades = response.data;
      },
      (error) => {
        console.error('Error al obtener actividades:', error);
      }
    );
  }

  // Crear nueva actividad
  createActivity() {
    this.activityService.createActivity(this.newActivity).subscribe(
      (response) => {
        this.toastMessage = 'Actividad creada exitosamente!';
        this.toastType = 'success';
        this.loadActivities(); // Recargar las actividades
        this.closeCreateModal(); // Cerrar modal después de crear
      },
      (error) => {
        console.error('Error al crear actividad:', error);
        this.toastMessage = 'Error al crear actividad.';
        this.toastType = 'error';
      }
    );
  }

  // Eliminar actividad
  deleteActivity(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      this.activityService.deleteActivity(id).subscribe(
        (response) => {
          this.toastMessage = 'Actividad eliminada';
          this.toastType = 'success';
          this.loadActivities(); // Recargar actividades
        },
        (error) => {
          console.error('Error al eliminar actividad:', error);
          this.toastMessage = 'Error al eliminar actividad';
          this.toastType = 'error';
        }
      );
    }
  }

  // Editar actividad
  editActivity(activity: any): void {
    this.router.navigate(['/activities/edit', activity.id_actividad]);
  }

  // Abrir modal para crear actividad
  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  // Cerrar modal de creación
  closeCreateModal() {
    this.isCreateModalOpen = false;
  }
}
