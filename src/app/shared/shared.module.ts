import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';  // Asegúrate de importar el componente
import { ToastComponent } from './toast/toast.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SideNavComponent,  // Declara los componentes que compartes
    ToastComponent
  ],
  imports: [
    CommonModule,  // Importa módulos comunes,
    RouterModule
  ],
  exports: [
    SideNavComponent,  // Exporta los componentes para que otros módulos los usen
    ToastComponent
  ]
})
export class SharedModule { }
