import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';



@NgModule({
  declarations: [
    GroupListComponent,
    GroupCreateComponent,
    GroupDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GroupsModule { }
