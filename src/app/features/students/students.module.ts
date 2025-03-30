import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module'; 
import { FormsModule } from '@angular/forms'; // Añade esta línea
@NgModule({
  declarations: [
    StudentListComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule 
  ]
})
export class StudentsModule { }
