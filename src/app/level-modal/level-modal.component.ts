import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.scss'],
  standalone: false
})
export class LevelModalComponent {
  @Input() level: any;

  constructor(private modalController: ModalController, private navCtrl: NavController) {}

  startGame() {
    this.modalController.dismiss(); // Cierra el modal
    this.navCtrl.navigateForward(`/story?level=${this.level.id}`);
  }

  close() {
    this.modalController.dismiss();
  }

  
  async play() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  
    // Solo cierra el modal, y deja que HomePage navegue
    await this.modalController.dismiss({ jugar: true, levelId: this.level.id });
  }
  
  
}