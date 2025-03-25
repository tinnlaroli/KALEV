import { NgModule } from '@angular/core';
import { RouterModule, Routes , Router , NavigationEnd} from '@angular/router';

import { GroupListComponent } from './features/groups/group-list/group-list.component';
import { GroupCreateComponent } from './features/groups/group-create/group-create.component';
import { StudentListComponent } from './features/students/student-list/student-list.component';
import { StudentProfileComponent } from './features/students/student-profile/student-profile.component';
import { ActivityListComponent } from './features/activities/activity-list/activity-list.component';
import { ActivityCreateComponent } from './features/activities/activity-create/activity-create.component';
import { ReportListComponent } from './features/reports/report-list/report-list.component';
import { ReportCreateComponent } from './features/reports/report-create/report-create.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserCreateComponent } from './features/users/user-create/user-create.component';
import { UserEditComponent } from './features/users/user-edit/user-edit.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './landing/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groups',
    component: GroupListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [4, 2] } // Superusuario y Director
  },
  {
    path: 'groups/create',
    component: GroupCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [4, 2] }
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] } // Solo Docente
  },
  {
    path: 'students/:id',
    component: StudentProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] }
  },
  {
    path: 'activities',
    component: ActivityListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] } // Solo Docente
  },
  {
    path: 'activities/create',
    component: ActivityCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] }
  },
  {
    path: 'reports',
    component: ReportListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 2] } // Docente y Director
  },
  {
    path: 'reports/create',
    component: ReportCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 2] }
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [4, 2, 1] } // Según jerarquía
  },
  {
    path: 'users/create',
    component: UserCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [4, 2, 1] }
  },
  {
    path: 'users/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [4, 2, 1] }
  },

  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor(private router: Router) {
    // Suscríbete a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Muestra la ruta activa en la consola
        console.log('Navegación exitosa a la ruta: ', event.urlAfterRedirects);
      }
    });
  }
  
}
