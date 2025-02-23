import { NgModule } from '@angular/core';  // Importa el decorador NgModule, que permite definir módulos en Angular
import { CommonModule } from '@angular/common';  // Importa el módulo común de Angular que proporciona funcionalidades básicas como directivas estructurales (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';  // Importa el módulo de formularios, necesario para manejar formularios reactivos o basados en plantillas

import { IonicModule } from '@ionic/angular';  // Importa el módulo de Ionic para usar componentes y servicios de la biblioteca Ionic

import { GruposPageRoutingModule } from './grupos-routing.module';  // Importa el módulo de enrutamiento para la página de grupos, que define las rutas específicas para esta página

import { GruposPage } from './grupos.page';  // Importa el componente de la página de grupos que se va a declarar en este módulo

@NgModule({
  imports: [  // Sección donde se especifican los módulos que se van a importar
    CommonModule,  // Se importa CommonModule para habilitar las funcionalidades comunes de Angular
    FormsModule,  // Se importa FormsModule para gestionar formularios en la página
    IonicModule,  // Se importa IonicModule para usar los componentes de la librería de Ionic
    GruposPageRoutingModule  // Se importa el módulo de enrutamiento específico para la página de grupos
  ],
  declarations: [GruposPage]  // Se declara el componente GruposPage para que se use en este módulo
})
export class GruposPageModule {}  // Define y exporta el módulo de la página de grupos