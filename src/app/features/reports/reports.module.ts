import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportCreateComponent } from './report-create/report-create.component';



@NgModule({
  declarations: [
    ReportListComponent,
    ReportCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportsModule { }
