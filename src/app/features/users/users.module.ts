import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsersModule { }
