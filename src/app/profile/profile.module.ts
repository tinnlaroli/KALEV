// Importación de los módulos necesarios para el módulo de ProfilePage
import { NgModule } from '@angular/core';  // Importación del decorador 'NgModule' de Angular
import { CommonModule } from '@angular/common';  // Importación del módulo común de Angular que proporciona funcionalidades esenciales
import { FormsModule } from '@angular/forms';  // Importación del módulo de formularios para usar formularios en la aplicación

import { IonicModule } from '@ionic/angular';  // Importación del módulo de Ionic para integrar las funcionalidades de Ionic

// Importación del módulo de enrutamiento específico para la página de perfil
import { ProfilePageRoutingModule } from './profile-routing.module';

// Importación del componente 'ProfilePage' que representa la página de perfil
import { ProfilePage } from './profile.page';

// Definición del módulo de la página de perfil
@NgModule({
  imports: [  // Lista de módulos que este módulo necesita
    CommonModule,  // Módulo común de Angular
    FormsModule,  // Módulo de formularios de Angular
    IonicModule,  // Módulo de Ionic
    ProfilePageRoutingModule  // Módulo de enrutamiento para la página de perfil
  ],
  declarations: [ProfilePage]  // Declaración del componente 'ProfilePage' para que Angular lo reconozca en este módulo
})
// Exportación del módulo ProfilePageModule, que encapsula todo lo necesario para la página de perfil
export class ProfilePageModule {}