// Importaciones necesarias para el módulo
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo con directivas comunes de Angular
import { FormsModule } from '@angular/forms'; // Módulo para el manejo de formularios en Angular

import { IonicModule } from '@ionic/angular'; // Módulo de Ionic para usar sus componentes

import { ActividadesPageRoutingModule } from './actividades-routing.module'; // Importación del módulo de rutas para la página de actividades

import { ActividadesPage } from './actividades.page'; // Importación del componente de la página de actividades

// Decorador @NgModule que define las configuraciones del módulo
@NgModule({
  imports: [
    CommonModule, // Permite el uso de directivas y funcionalidades básicas de Angular
    FormsModule, // Habilita el uso de formularios en la página
    IonicModule, // Permite el uso de componentes de Ionic en la página
    ActividadesPageRoutingModule // Importa la configuración de rutas específicas para la página de actividades
  ],
  declarations: [ActividadesPage] // Declara el componente ActividadesPage dentro de este módulo
})
export class ActividadesPageModule {} // Exportación del módulo para su uso en la aplicación