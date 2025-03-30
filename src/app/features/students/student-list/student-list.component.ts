import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';

interface Student {
  id_estudiante: number;
  nombre: string;
  ap_paterno: string;
  ap_materno?: string;
  correo: string;
  grupo_nombre?: string;
  id_grupo?: number;
}

@Component({
  standalone: false,
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';

  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
  toastVisible = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getAll().subscribe({
      next: (data: any) => {
        this.students = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes', err);
        this.errorMessage = 'Error al cargar los estudiantes';
        this.showToast('Error al cargar los estudiantes', 'error');
        this.isLoading = false;
      }
    });
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }

  get filteredStudents(): Student[] {
    if (!this.searchTerm) return this.students;
    return this.students.filter(student => 
      student.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.ap_paterno.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (student.ap_materno?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.correo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (student.id_grupo))
    );
  }

  getFullName(student: Student): string {
    return `${student.nombre} ${student.ap_paterno}${student.ap_materno ? ' ' + student.ap_materno : ''}`;
  }
}