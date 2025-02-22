// Importación de los módulos necesarios para el módulo de la página 'CalificacionesDetallePage'.
import { NgModule } from '@angular/core';  // Importa el decorador NgModule para definir un módulo Angular.
import { CommonModule } from '@angular/common';  // Importa CommonModule, que proporciona directivas básicas como ngIf, ngFor.
import { FormsModule } from '@angular/forms';  // Importa FormsModule, que habilita el uso de formularios en la aplicación.

import { IonicModule } from '@ionic/angular';  // Importa IonicModule, que proporciona componentes y directivas de Ionic.

import { CalificacionesDetallePageRoutingModule } from './calificaciones-detalle-routing.module';  // Importa el módulo de enrutamiento de esta página.

import { CalificacionesDetallePage } from './calificaciones-detalle.page';  // Importa la página 'CalificacionesDetallePage' que se va a declarar en este módulo.

@NgModule({
  imports: [
    // Define los módulos que se van a importar para que estén disponibles en este módulo.
    CommonModule,  // Módulo común con funcionalidades básicas.
    FormsModule,  // Módulo que permite trabajar con formularios.
    IonicModule,  // Módulo que contiene los componentes de Ionic.
    CalificacionesDetallePageRoutingModule  // Módulo de enrutamiento de la página que maneja las rutas específicas para esta vista.
  ],
  declarations: [CalificacionesDetallePage]  // Declara el componente 'CalificacionesDetallePage', es la página que será utilizada.
})
export class CalificacionesDetallePageModule {}  // Define el módulo 'CalificacionesDetallePageModule' que agrupa todos los elementos mencionados.