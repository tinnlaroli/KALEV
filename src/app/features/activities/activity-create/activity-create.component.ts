import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../../services/activity.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css'],
})
export class ActivityCreateComponent implements OnInit {
  activityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private router: Router
  ) {
    this.activityForm = this.fb.group({
      nombre_actividad: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.activityForm.valid) {
      this.activityService.createActivity(this.activityForm.value).subscribe(
        (response) => {
          console.log('Actividad creada:', response);
          this.router.navigate(['/activities']);
        },
        (error) => {
          console.error('Error al crear actividad:', error);
        }
      );
    }
  }
}
