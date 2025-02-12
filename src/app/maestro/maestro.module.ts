import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroPageRoutingModule } from './maestro-routing.module';

import { MaestroPage } from './maestro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroPageRoutingModule
  ],
  declarations: [MaestroPage]
})
export class MaestroPageModule {}
