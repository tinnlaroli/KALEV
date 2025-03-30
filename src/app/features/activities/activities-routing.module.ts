import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';

const routes: Routes = [
  { path: 'activities', component: ActivityListComponent },
  { path: 'activities/create', component: ActivityCreateComponent },
  { path: 'activities/edit/:id', component: ActivityEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
