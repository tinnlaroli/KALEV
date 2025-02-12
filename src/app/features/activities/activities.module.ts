import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';



@NgModule({
  declarations: [
    ActivityListComponent,
    ActivityCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ActivitiesModule { }
