import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-profile',
  standalone: false,
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  student: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const studentId = params.get('id');
      if (studentId) {
        this.studentService.getById(studentId).subscribe({
          next: (data) => this.student = data,
          error: (err) => console.error('Error al cargar el perfil del estudiante', err)
        });
      }
    });
  }
}