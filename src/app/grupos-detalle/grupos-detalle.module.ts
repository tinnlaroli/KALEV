import { NgModule } from '@angular/core';  // Importa el decorador NgModule de Angular para definir módulos
import { CommonModule } from '@angular/common';  // Importa CommonModule, que proporciona directivas comunes como ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';  // Importa FormsModule para trabajar con formularios y enlaces de datos en Angular

import { IonicModule } from '@ionic/angular';  // Importa IonicModule, que permite el uso de componentes de Ionic como ion-header, ion-content, etc.

import { GruposDetallePageRoutingModule } from './grupos-detalle-routing.module';  // Importa el módulo de enrutamiento específico para la página de detalles de grupos

import { GruposDetallePage } from './grupos-detalle.page';  // Importa el componente GruposDetallePage, que contiene la lógica y la vista para la página de detalles de grupos

@NgModule({
  imports: [
    CommonModule,  // Importa el módulo común para habilitar directivas comunes
    FormsModule,  // Importa FormsModule para habilitar formularios y enlace de datos
    IonicModule,  // Importa IonicModule para habilitar componentes de Ionic
    GruposDetallePageRoutingModule  // Importa el módulo de enrutamiento que gestiona las rutas de esta página
  ],
  declarations: [GruposDetallePage]  // Declara el componente GruposDetallePage dentro de este módulo
})
export class GruposDetallePageModule {}  // Define el módulo de la página de detalles de grupos