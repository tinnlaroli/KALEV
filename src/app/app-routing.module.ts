// Importa NgModule desde Angular para definir un módulo de Angular.
import { NgModule } from '@angular/core';

// Importa PreloadAllModules y RouterModule desde Angular Router para gestionar la navegación y el pre-cargado de módulos.
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Definición de las rutas de la aplicación.
const routes: Routes = [
  // Redirección desde la raíz de la aplicación a la pantalla de splash.
  {
    path: '',
    redirectTo: 'splash', // Redirige al path 'splash'
    pathMatch: 'full', // Asegura que coincida exactamente con el path vacío
  },
  // Ruta para la pantalla de splash que se carga dinámicamente.
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule), // Carga el módulo de la página de splash.
  },
  // Ruta para la página de login, se carga de manera perezosa.
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), // Carga el módulo de la página de login.
  },
  // Ruta para la página de cursos, carga el módulo de cursos.
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesPageModule), // Carga el módulo de la página de cursos.
  },
  // Ruta para la página de perfil, se carga de manera perezosa.
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule), // Carga el módulo de la página de perfil.
  },
  // Ruta para la configuración del alumno.
  {
    path: 'settings-alumno',
    loadChildren: () => import('./settings-alumno/settings.module').then(m => m.SettingsPageModule), // Carga el módulo de configuración para alumnos.
  },
  // Ruta para la tienda, carga el módulo de la página de tienda.
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then(m => m.TiendaPageModule), // Carga el módulo de la tienda.
  },

  // Rutas para la interfaz de los maestros.
  // Ruta para la página principal del maestro.
  {
    path: 'maestro',
    loadChildren: () => import('./maestro/maestro.module').then(m => m.MaestroPageModule), // Carga el módulo de la página principal del maestro.
  },
  // Ruta para la página de grupos del maestro.
  {
    path: 'grupos',
    loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposPageModule), // Carga el módulo de la página de grupos del maestro.
  },
  // Ruta para la página de actividades del maestro.
  {
    path: 'actividades',
    loadChildren: () => import('./actividades/actividades.module').then(m => m.ActividadesPageModule), // Carga el módulo de la página de actividades del maestro.
  },
  // Ruta para la página de calificaciones del maestro.
  {
    path: 'calificaciones',
    loadChildren: () => import('./calificaciones/calificaciones.module').then(m => m.CalificacionesPageModule), // Carga el módulo de la página de calificaciones del maestro.
  },
  // Ruta para la página de detalles de calificaciones.
  {
    path: 'calificaciones-detalle',
    loadChildren: () => import('./calificaciones-detalle/calificaciones-detalle.module').then(m => m.CalificacionesDetallePageModule), // Carga el módulo de detalles de calificaciones.
  },
  // Ruta para la configuración del maestro.
  {
    path: 'settings-maestro',
    loadChildren: () => import('./settings-maestro/settings-maestro.module').then(m => m.SettingsMaestroPageModule), // Carga el módulo de configuración para maestros.
  },
  // Ruta para el detalle de los grupos.
  {
    path: 'grupos-detalle',
    loadChildren: () => import('./grupos-detalle/grupos-detalle.module').then(m => m.GruposDetallePageModule), // Carga el módulo de detalle de grupos.
  }
];

// Decorador NgModule que define el módulo de rutas de la aplicación.
@NgModule({
  imports: [
    // Configura el RouterModule con las rutas definidas y la estrategia de precarga de módulos.
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Pre-carga todos los módulos para mejorar la velocidad de carga.
  ],
  // Exporta el RouterModule para que pueda ser utilizado en otros módulos de la aplicación.
  exports: [RouterModule]
})
// Exporta la clase del módulo de rutas de la aplicación.
export class AppRoutingModule {}
