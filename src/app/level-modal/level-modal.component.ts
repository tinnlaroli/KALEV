import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.scss'],
  standalone: false
})
export class LevelModalComponent {
  @Input() level: any;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }

  play() {
    console.log('Jugando nivel:', this.level.id);
    this.modalController.dismiss({ nextLevel: true }); // Aquí indicamos que se desbloquee el siguiente nivel
  }
}
