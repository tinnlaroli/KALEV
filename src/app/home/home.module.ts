import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CongratulationsModalComponent } from '../congratulations-modal/congratulations-modal.component';
import { LevelModalComponent } from '../level-modal/level-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CongratulationsModalComponent, LevelModalComponent]
})
export class HomePageModule {}
