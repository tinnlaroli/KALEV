import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    ActivityListComponent,
    ActivityCreateComponent,
    ActivityEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActivitiesRoutingModule,
    SharedModule
  ],
  exports: [
    ActivityListComponent,
    ActivityCreateComponent,
    ActivityEditComponent
  ]
})
export class ActivitiesModule { }
