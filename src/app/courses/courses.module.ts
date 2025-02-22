// Importa el decorador NgModule desde Angular para definir el módulo
import { NgModule } from '@angular/core';
// Importa CommonModule para acceder a las funcionalidades comunes de Angular
import { CommonModule } from '@angular/common';
// Importa FormsModule para trabajar con formularios en Angular
import { FormsModule } from '@angular/forms';
// Importa IonicModule para acceder a las funcionalidades de Ionic
import { IonicModule } from '@ionic/angular';
// Importa el módulo de enrutamiento para la página de cursos
import { CoursesPageRoutingModule } from './courses-routing.module';
// Importa la clase de la página de Cursos
import { CoursesPage } from './courses.page';

@NgModule({
  // Especifica los módulos que se deben importar para que esta página funcione
  imports: [
    CommonModule,              // Módulo común de Angular que proporciona funcionalidades básicas
    FormsModule,               // Módulo necesario para trabajar con formularios en Angular
    IonicModule,               // Módulo de Ionic necesario para componentes de la interfaz de usuario
    CoursesPageRoutingModule   // Módulo de enrutamiento específico para esta página
  ],
  // Declara la clase de la página que se usará en este módulo
  declarations: [CoursesPage]
})
// Exporta la clase del módulo, haciendo que sea accesible en otras partes de la aplicación
export class CoursesPageModule {}