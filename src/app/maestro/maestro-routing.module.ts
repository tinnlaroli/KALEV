import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroPage } from './maestro.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroPage,
    children: [
      {
        path: 'grupos',
        loadChildren: () =>
          import('../grupos/grupos.module').then((m) => m.GruposPageModule),
      },
      {
        path: 'actividades',
        loadChildren: () =>
          import('../actividades/actividades.module').then(
            (m) => m.ActividadesPageModule
          ),
      },
      {
        path: 'calificaciones',
        loadChildren: () =>
          import('../calificaciones/calificaciones.module').then(
            (m) => m.CalificacionesPageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings-alumno/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: '',
        redirectTo: 'grupos',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroPageRoutingModule {}
