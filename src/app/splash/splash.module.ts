import { NgModule } from '@angular/core'; // Importa NgModule desde Angular para crear un módulo de la aplicación
import { CommonModule } from '@angular/common'; // Importa CommonModule, necesario para usar directivas comunes como ngIf y ngFor
import { FormsModule } from '@angular/forms'; // Importa FormsModule para trabajar con formularios (si se usan en esta página)
import { IonicModule } from '@ionic/angular'; // Importa IonicModule para usar componentes de Ionic, como ion-content, ion-button, etc.

import { SplashPageRoutingModule } from './splash-routing.module'; // Importa el módulo de rutas específico de la página Splash
import { SplashPage } from './splash.page'; // Importa la clase SplashPage, que es el componente de la página de splash

@NgModule({
  imports: [
    CommonModule, // Importa CommonModule para usar funcionalidades básicas de Angular
    FormsModule, // Importa FormsModule para manejar formularios
    IonicModule, // Importa IonicModule para usar los componentes de Ionic
    SplashPageRoutingModule // Importa el módulo de rutas específico para la SplashPage
  ],
  declarations: [SplashPage] // Declara el componente SplashPage en este módulo
})
export class SplashPageModule {} // Define el módulo de la SplashPage, que agrupa todos los elementos relacionados con esta página
