// Importa el decorador NgModule de Angular, necesario para definir módulos en Angular.
import { NgModule } from '@angular/core';

// Importa el módulo CommonModule que proporciona funcionalidades comunes, como directivas y pipes, en Angular.
import { CommonModule } from '@angular/common';

// Importa el módulo FormsModule, que permite trabajar con formularios en Angular, como las validaciones y el manejo de datos de formularios.
import { FormsModule } from '@angular/forms';

// Importa IonicModule, que proporciona los componentes y funcionalidades específicas de Ionic, como botones, tarjetas, etc.
import { IonicModule } from '@ionic/angular';

// Importa el módulo de enrutamiento específico para la página de Tienda. Este módulo gestiona las rutas de navegación para esta página.
import { TiendaPageRoutingModule } from './tienda-routing.module';

// Importa el componente TiendaPage, que representa la página de la tienda en la aplicación.
import { TiendaPage } from './tienda.page';

// Define un módulo de Angular utilizando el decorador NgModule.
@NgModule({
  imports: [
    // Declara los módulos que se van a importar en este módulo, lo que permite usar sus funcionalidades.
    CommonModule, // Para usar directivas y pipes comunes.
    FormsModule, // Para trabajar con formularios en Angular.
    IonicModule, // Para usar los componentes de Ionic.
    TiendaPageRoutingModule // Para manejar las rutas de la página Tienda.
  ],
  declarations: [TiendaPage] // Declara el componente TiendaPage en este módulo.
})
// Exporta la clase TiendaPageModule, que es el módulo de Angular para la página Tienda.
export class TiendaPageModule {}
