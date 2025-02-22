import { NgModule } from '@angular/core';  // Importación de NgModule para la configuración del módulo
import { CommonModule } from '@angular/common';  // Importación de módulos comunes necesarios
import { FormsModule } from '@angular/forms';  // Importación de FormsModule para trabajar con formularios en Angular

import { IonicModule } from '@ionic/angular';  // Importación del módulo Ionic para funcionalidades de Ionic

import { CalificacionesPageRoutingModule } from './calificaciones-routing.module';  // Importación del módulo de rutas específico para la página de calificaciones

import { CalificacionesPage } from './calificaciones.page';  // Importación del componente de la página de calificaciones

@NgModule({
  imports: [
    // Se importan los módulos necesarios para este módulo
    CommonModule,  // Módulo común de Angular
    FormsModule,  // Módulo de formularios de Angular
    IonicModule,  // Módulo principal de Ionic
    CalificacionesPageRoutingModule  // Módulo de rutas de la página de calificaciones
  ],
  declarations: [CalificacionesPage]  // Declaración del componente de la página de calificaciones
})
export class CalificacionesPageModule {}  // Declaración del módulo para la página de calificaciones