import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalificacionesDetallePage } from './calificaciones-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CalificacionesDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalificacionesDetallePageRoutingModule {}
