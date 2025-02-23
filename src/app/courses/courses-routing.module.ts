// Importa el decorador NgModule desde Angular para definir el módulo
import { NgModule } from '@angular/core';
// Importa Routes y RouterModule para la configuración de rutas en Angular
import { Routes, RouterModule } from '@angular/router';

// Importa la clase de la página de Cursos
import { CoursesPage } from './courses.page';

// Define las rutas para el módulo de la página de Cursos
const routes: Routes = [
  {
    path: '', // La ruta raíz de este módulo
    component: CoursesPage, // Asocia la ruta raíz con el componente CoursesPage
    children: [ // Define las rutas secundarias dentro de la página de Cursos
      {
        path: '', // Ruta vacía, que redirige a la página principal de cursos
        redirectTo: 'courses', // Redirige a la ruta de cursos
        pathMatch: 'full', // Asegura que la redirección se haga cuando la ruta completa esté vacía
      },
      {
        path: 'profile', // Ruta para la página de perfil
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule), // Carga de forma perezosa el módulo de perfil
      },
      {
        path: 'settings', // Ruta para la página de configuración
        loadChildren: () => import('../settings-alumno/settings.module').then(m => m.SettingsPageModule), // Carga de forma perezosa el módulo de configuración
      },
    ],
  },
];

@NgModule({
  // Importa el RouterModule y configura las rutas hijas para este módulo
  imports: [RouterModule.forChild(routes)],
  // Exporta el RouterModule para que las rutas sean accesibles en otras partes de la aplicación
  exports: [RouterModule],
})
// Exporta el módulo de enrutamiento para la página de Cursos
export class CoursesPageRoutingModule {}