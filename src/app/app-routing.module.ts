import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Interfaz de alumnos
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'settings-alumno',
    loadChildren: () => import('./settings-alumno/settings.module').then(m => m.SettingsPageModule),
  },
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then( m => m.TiendaPageModule)
  },

  //Interfaz de maestros
  {
    path: 'maestro',
    loadChildren: () => import('./maestro/maestro.module').then( m => m.MaestroPageModule)
  },
  {
    path: 'grupos',
    loadChildren: () => import('./grupos/grupos.module').then( m => m.GruposPageModule)
  },
  {
    path: 'actividades',
    loadChildren: () => import('./actividades/actividades.module').then( m => m.ActividadesPageModule)
  },
  {
    path: 'calificaciones',
    loadChildren: () => import('./calificaciones/calificaciones.module').then( m => m.CalificacionesPageModule)
  },
  {
    path: 'calificaciones-detalle',
    loadChildren: () => import('./calificaciones-detalle/calificaciones-detalle.module').then( m => m.CalificacionesDetallePageModule)
  },
  {
    path: 'settings-maestro',
    loadChildren: () => import('./settings-maestro/settings-maestro.module').then( m => m.SettingsMaestroPageModule)
  },  {
    path: 'grupos-detalle',
    loadChildren: () => import('./grupos-detalle/grupos-detalle.module').then( m => m.GruposDetallePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

