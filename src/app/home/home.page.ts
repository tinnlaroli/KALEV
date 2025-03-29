import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LevelModalComponent } from '../level-modal/level-modal.component';
import { CongratulationsModalComponent } from '../congratulations-modal/congratulations-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  levels = [
    { id: 1, unlocked: true, color: '#FFD700' },
    { id: 2, unlocked: false, color: '#FF4500' },
    { id: 3, unlocked: false, color: '#1E90FF' },
    { id: 4, unlocked: false, color: '#32CD32' },
    { id: 5, unlocked: false, color: '#9400D3' },
    { id: 6, unlocked: false, color: '#FF1493' },
    { id: 7, unlocked: false, color: '#00BFFF' },
    { id: 8, unlocked: false, color: '#FF8C00' },
    { id: 9, unlocked: false, color: '#FFD700' },
    { id: 10, unlocked: false, color: '#FF4500' },
  ];

  constructor(private modalController: ModalController, private navCtrl: NavController) {}

  ngOnInit() {}

  async showLevelModal(level: any) {
    const modal = await this.modalController.create({
      component: LevelModalComponent,
      componentProps: { level },
    });
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
  
    if (data?.jugar && data?.levelId) {
      this.navCtrl.navigateForward(`/story?level=${data.levelId}`);

    } else if (data?.nextLevel) {
      this.unlockNextLevel(level.id);
      this.showCongratulationsModal(level);
    }
  }
  

  async showCongratulationsModal(level: any) {
    const modal = await this.modalController.create({
      component: CongratulationsModalComponent,
      componentProps: { level },
    });
    await modal.present();
  }

  unlockNextLevel(currentLevelId: number) {
    const nextLevel = this.levels.find((level) => level.id === currentLevelId + 1);
    if (nextLevel) {
      nextLevel.unlocked = true;
      console.log('Siguiente nivel desbloqueado:', nextLevel.id);
    }
  }

  playLevel(level: any) {
    if (level.unlocked) {
      this.showLevelModal(level);
    } else {
      console.log('Nivel bloqueado');
    }
  }
}