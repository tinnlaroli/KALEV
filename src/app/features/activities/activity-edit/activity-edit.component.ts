import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../../services/activity.service';

@Component({
  standalone:false,
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {
  activityForm: FormGroup;
  idActividad: number = 0;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.activityForm = this.fb.group({
      nombre_actividad: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idActividad = id ? +id : 0;
    this.activityService.getActivityById(this.idActividad).subscribe(
      (response) => {
        this.activityForm.patchValue(response.data); // Cargar datos en el formulario
      },
      (error) => {
        console.error('Error al obtener la actividad:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      this.activityService.updateActivity(this.idActividad, this.activityForm.value).subscribe(
        (response) => {
          console.log('Actividad actualizada:', response);
          this.router.navigate(['/activities']); // Redirigir al listado de actividades
        },
        (error) => {
          console.error('Error al actualizar actividad:', error);
        }
      );
    }
  }
}
