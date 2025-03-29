import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-congratulations-modal',
  templateUrl: './congratulations-modal.component.html',
  styleUrls: ['./congratulations-modal.component.scss'],
  standalone: false
})
export class CongratulationsModalComponent {
  @Input() level: any;

  constructor(private modalController: ModalController, private navCtrl: NavController) {}

  play() {
    this.modalController.dismiss(); // Cierra el modal primero
    this.navCtrl.navigateForward(`/story?level=${this.level.id}`);
  }

  close() {
    this.modalController.dismiss();
  }
}