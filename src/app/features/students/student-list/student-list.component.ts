import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
@Component({
  standalone: false,
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Error al obtener estudiantes', err)
    });
  }
}
