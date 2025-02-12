import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificacionesDetallePageRoutingModule } from './calificaciones-detalle-routing.module';

import { CalificacionesDetallePage } from './calificaciones-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificacionesDetallePageRoutingModule
  ],
  declarations: [CalificacionesDetallePage]
})
export class CalificacionesDetallePageModule {}
