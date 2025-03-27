import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { SharedModule } from '../../shared/shared.module'; 

@NgModule({
  declarations: [
    GroupListComponent,
    GroupCreateComponent,
    GroupDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ]
})
export class GroupsModule { }
