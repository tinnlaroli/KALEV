import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-congratulations-modal',
  templateUrl: './congratulations-modal.component.html',
  styleUrls: ['./congratulations-modal.component.scss'],
  standalone: false
})
export class CongratulationsModalComponent {
  @Input() level: any;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
