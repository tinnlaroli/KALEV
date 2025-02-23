import { NgModule } from '@angular/core';  // Importa el decorador NgModule de Angular para crear un módulo
import { Routes, RouterModule } from '@angular/router';  // Importa los elementos necesarios para definir rutas y configurar el enrutamiento

import { GruposPage } from './grupos.page';  // Importa el componente GruposPage que se asociará a la ruta

const routes: Routes = [  // Define las rutas para la página de grupos
  {
    path: '',  // Ruta raíz (cuando no hay ruta específica, se carga esta página)
    component: GruposPage  // El componente que se renderiza cuando se accede a esta ruta es GruposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configura las rutas utilizando RouterModule.forChild, que es necesario para las rutas hijas (cuando un módulo tiene rutas internas)
  exports: [RouterModule],  // Exporta RouterModule para que las rutas definidas puedan ser usadas en el módulo principal de la aplicación
})
export class GruposPageRoutingModule {}  // Define y exporta el módulo de enrutamiento para la página de grupos