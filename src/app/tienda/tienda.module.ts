import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaPageRoutingModule } from './tienda-routing.module';

import { TiendaPage } from './tienda.page';
import { CompraExitosaComponent } from '../components/compra-exitosa/compra-exitosa.component';
import { ConfirmacionCompraComponent } from '../components/confirmacion-compra/confirmacion-compra.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TiendaPageRoutingModule],
  declarations: [
    TiendaPage,
    ConfirmacionCompraComponent,
    CompraExitosaComponent,
  ],
})
export class TiendaPageModule {}
