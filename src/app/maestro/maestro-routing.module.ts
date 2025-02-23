import { NgModule } from '@angular/core';  // Importa el decorador NgModule desde Angular core, necesario para configurar un módulo en Angular
import { Routes, RouterModule } from '@angular/router';  // Importa las clases necesarias para definir rutas en el módulo
import { MaestroPage } from './maestro.page';  // Importa el componente MaestroPage, que es el componente principal para este módulo

const routes: Routes = [  // Define un arreglo de rutas para la página MaestroPage y sus rutas secundarias
  {
    path: '',  // Ruta raíz para este módulo, carga el componente MaestroPage
    component: MaestroPage,  // El componente que se cargará cuando se acceda a esta ruta
    children: [  // Define rutas hijas (o subrutas) dentro de la página MaestroPage
      {
        path: 'grupos',  // Ruta para acceder a la página de grupos
        loadChildren: () =>  // Carga el módulo de grupos de forma perezosa (lazy loading)
          import('../grupos/grupos.module').then((m) => m.GruposPageModule),  // Importa y carga el módulo de grupos
      },
      {
        path: 'actividades',  // Ruta para acceder a la página de actividades
        loadChildren: () =>  // Carga el módulo de actividades de forma perezosa
          import('../actividades/actividades.module').then(
            (m) => m.ActividadesPageModule  // Importa y carga el módulo de actividades
          ),
      },
      {
        path: 'calificaciones',  // Ruta para acceder a la página de calificaciones
        loadChildren: () =>  // Carga el módulo de calificaciones de forma perezosa
          import('../calificaciones/calificaciones.module').then(
            (m) => m.CalificacionesPageModule  // Importa y carga el módulo de calificaciones
          ),
      },
      {
        path: 'settings',  // Ruta para acceder a la página de configuración de alumno
        loadChildren: () =>  // Carga el módulo de configuración de alumno de forma perezosa
          import('../settings-alumno/settings.module').then((m) => m.SettingsPageModule),  // Importa y carga el módulo de configuración de alumno
      },
      {
        path: '',  // Ruta por defecto para cuando no se especifica una ruta hija
        redirectTo: 'grupos',  // Redirige a la página de grupos por defecto
        pathMatch: 'full',  // Especifica que se debe hacer una coincidencia exacta con la ruta vacía
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configura el módulo de enrutamiento para las rutas definidas, permitiendo navegación
  exports: [RouterModule],  // Exporta el módulo de rutas para ser utilizado en otros módulos
})
export class MaestroPageRoutingModule {}  // Define y exporta el módulo de enrutamiento para la página MaestroPage