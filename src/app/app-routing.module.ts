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

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/create', component: GroupCreateComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentProfileComponent },
  { path: 'activities', component: ActivityListComponent },
  { path: 'activities/create', component: ActivityCreateComponent },
  { path: 'reports', component: ReportListComponent },
  { path: 'reports/create', component: ReportCreateComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'landing', component: LandingComponent },
  { path: '**', redirectTo: '/dashboard' },  // Redirección por defecto
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
