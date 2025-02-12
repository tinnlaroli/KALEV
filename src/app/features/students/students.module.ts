import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';



@NgModule({
  declarations: [
    StudentListComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentsModule { }
