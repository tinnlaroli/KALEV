import { NgModule } from '@angular/core';  // Importa el decorador NgModule desde Angular core, que se usa para definir un módulo en Angular
import { CommonModule } from '@angular/common';  // Importa CommonModule, que incluye funcionalidades básicas comunes como directivas (ngIf, ngFor)
import { FormsModule } from '@angular/forms';  // Importa FormsModule, necesario para trabajar con formularios en Angular

import { IonicModule } from '@ionic/angular';  // Importa IonicModule, necesario para usar los componentes de la librería Ionic

import { MaestroPageRoutingModule } from './maestro-routing.module';  // Importa el módulo de rutas específico para este componente, que contiene la configuración de las rutas relacionadas con MaestroPage

import { MaestroPage } from './maestro.page';  // Importa el componente MaestroPage que se está configurando en este módulo

@NgModule({
  imports: [  // Define los módulos que se deben importar para este módulo
    CommonModule,  // Proporciona directivas, pipes y servicios comunes como el manejo de listas o condicionales
    FormsModule,  // Permite trabajar con formularios en Angular
    IonicModule,  // Permite usar todos los componentes, directivas y pipes de Ionic en este módulo
    MaestroPageRoutingModule  // Incluye el módulo de rutas específico para la página de Maestro
  ],
  declarations: [MaestroPage]  // Declara el componente MaestroPage dentro de este módulo
})
export class MaestroPageModule {}  // Define y exporta el módulo MaestroPageModule