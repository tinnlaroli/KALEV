import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsMaestroPage } from './settings-maestro.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsMaestroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsMaestroPageRoutingModule {}
