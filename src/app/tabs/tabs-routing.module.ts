import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      //Interafaz de alumno
      {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module').then(m => m.CoursesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'settings-alumno',
        loadChildren: () => import('../settings-alumno/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/courses',
        pathMatch: 'full'
      },
      

      //Interafaz de maestro
      {
        path: 'grupos',
        loadChildren: () => import('../grupos/grupos.module').then(m => m.GruposPageModule)
      },
      {
        path: 'actividades',
        loadChildren: () => import('../actividades/actividades.module').then(m => m.ActividadesPageModule)
      },
      {
        path: 'calificaciones',
        loadChildren: () => import('../calificaciones/calificaciones.module').then(m => m.CalificacionesPageModule)
      },
      
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/courses',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/tabs/grupos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
