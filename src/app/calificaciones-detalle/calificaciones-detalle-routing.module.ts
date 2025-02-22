// Importación de los módulos necesarios para definir las rutas de esta página.
import { NgModule } from '@angular/core';  // Importa el decorador NgModule para definir un módulo Angular.
import { Routes, RouterModule } from '@angular/router';  // Importa Routes y RouterModule para gestionar las rutas de la aplicación.

import { CalificacionesDetallePage } from './calificaciones-detalle.page';  // Importa el componente de la página 'CalificacionesDetallePage' que se va a asociar con la ruta.

const routes: Routes = [
  {
    // Define una ruta para la página 'CalificacionesDetallePage'.
    path: '',  // Ruta vacía (significa que es la ruta principal de esta página).
    component: CalificacionesDetallePage  // Asocia la ruta a 'CalificacionesDetallePage'.
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Importa RouterModule y configura las rutas para esta página específica.
  exports: [RouterModule],  // Exporta RouterModule para que pueda ser utilizado en otras partes de la aplicación.
})
export class CalificacionesDetallePageRoutingModule {}  // Define el módulo de enrutamiento para la página 'CalificacionesDetallePage'.