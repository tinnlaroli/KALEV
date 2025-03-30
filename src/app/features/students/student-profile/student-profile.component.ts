import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { DatePipe } from '@angular/common';

interface Student {
  id_estudiante: number;
  nombre: string;
  ap_paterno: string;
  ap_materno?: string;
  correo: string;
  telefono?: string;
  fecha_nacimiento?: string;
  id_grupo?: number;
  grupo_nombre?: string;
  fecha_registro?: string;
  direccion?: string;
  tutor_nombre?: string;
  tutor_telefono?: string;
}

@Component({
  standalone: false,
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  providers: [DatePipe]
})
export class StudentProfileComponent implements OnInit {
  student: Student | null = null;
  isLoading = true;
  errorMessage = '';
  currentDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.route.paramMap.subscribe({
      next: params => {
        const studentId = params.get('id');
        if (studentId) {
          this.studentService.getById(studentId).subscribe({
            next: (data: any) => {
              this.student = data;
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Error al cargar el perfil del estudiante', err);
              this.errorMessage = 'Error al cargar los datos del estudiante';
              this.isLoading = false;
            }
          });
        } else {
          this.errorMessage = 'ID de estudiante no proporcionado';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error al obtener parámetros de ruta', err);
        this.errorMessage = 'Error al procesar la solicitud';
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'No registrada';
    return this.datePipe.transform(dateString, 'dd/MM/yyyy') || 'Fecha inválida';
  }

  calculateAge(birthDate?: string): string {
    if (!birthDate) return 'No registrada';
    
    const birth = new Date(birthDate);
    const age = this.currentDate.getFullYear() - birth.getFullYear();
    const monthDiff = this.currentDate.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && this.currentDate.getDate() < birth.getDate())) {
      return (age - 1) + ' años';
    }
    return age + ' años';
  }

  reloadData(): void {
    this.loadStudentData();
  }
}