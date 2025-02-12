import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  // Si usas formularios en tus componentes
  ],
  exports: [
    UserListComponent,
    UserCreateComponent
  ],
  providers: [UserService],  // Si el servicio solo lo usas en este módulo
})
export class UsersModule { }
