import { NgModule } from '@angular/core'; // Importa NgModule desde Angular para definir módulos.
import { CommonModule } from '@angular/common'; // Importa CommonModule que proporciona directivas comunes como ngIf y ngFor.
import { FormsModule } from '@angular/forms'; // Importa FormsModule para trabajar con formularios en Angular.

import { IonicModule } from '@ionic/angular'; // Importa IonicModule para usar los componentes de Ionic como ion-button, ion-header, etc.

import { LoginPageRoutingModule } from './login-routing.module'; // Importa el módulo de rutas específico para la página de login.

import { LoginPage } from './login.page'; // Importa el componente LoginPage que es el componente principal de esta página.

@NgModule({
  imports: [
    CommonModule, // Importa CommonModule para habilitar las directivas básicas de Angular.
    FormsModule, // Importa FormsModule para habilitar el soporte de formularios en Angular.
    IonicModule, // Importa IonicModule para habilitar el uso de componentes de Ionic.
    LoginPageRoutingModule // Importa el módulo de rutas para que las rutas específicas de la página de login se gestionen correctamente.
  ],
  declarations: [LoginPage] // Declara el componente LoginPage para que sea parte de este módulo.
})
export class LoginPageModule {} // Define el LoginPageModule que agrupa todos los módulos y componentes necesarios para la página de login.