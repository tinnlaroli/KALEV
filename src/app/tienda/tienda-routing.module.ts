// Importa el decorador NgModule desde Angular, necesario para definir módulos en Angular.
import { NgModule } from '@angular/core';

// Importa Routes y RouterModule desde Angular, que son necesarios para gestionar las rutas y la navegación en la aplicación.
import { Routes, RouterModule } from '@angular/router';

// Importa el componente TiendaPage, que será la página que se mostrará cuando se navegue a esta ruta.
import { TiendaPage } from './tienda.page';

// Define las rutas para esta página en particular. En este caso, se configura la ruta raíz (path vacío) para cargar TiendaPage.
const routes: Routes = [
  {
    path: '', // Ruta vacía, es decir, esta es la ruta predeterminada para este módulo.
    component: TiendaPage // El componente TiendaPage se renderizará cuando se navegue a esta ruta.
  }
];

// Usa el decorador NgModule para declarar el módulo.
@NgModule({
  imports: [
    // Se importa RouterModule para gestionar las rutas definidas previamente (en este caso, sólo la ruta de TiendaPage).
    RouterModule.forChild(routes) // Configura las rutas para este módulo específico (no es para la aplicación completa).
  ],
  exports: [
    // Se exporta RouterModule para que las rutas puedan ser utilizadas en otros módulos si es necesario.
    RouterModule
  ],
})
// Exporta el TiendaPageRoutingModule para ser usado en otros módulos de la aplicación.
export class TiendaPageRoutingModule {}
