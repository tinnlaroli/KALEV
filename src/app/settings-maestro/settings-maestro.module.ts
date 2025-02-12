import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsMaestroPageRoutingModule } from './settings-maestro-routing.module';

import { SettingsMaestroPage } from './settings-maestro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsMaestroPageRoutingModule
  ],
  declarations: [SettingsMaestroPage]
})
export class SettingsMaestroPageModule {}
