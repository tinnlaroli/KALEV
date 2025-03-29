import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-compra-exitosa',
  templateUrl: './compra-exitosa.component.html',
  styleUrls: ['./compra-exitosa.component.scss'],
  standalone: false
})
export class CompraExitosaComponent {
  @Input() item: any;
  @Input() monedasRestantes: number = 0;

  constructor(private modalCtrl: ModalController) {}

  compartir() {
    this.modalCtrl.dismiss({ compartir: true });
  }

  

  cerrar() {
    this.modalCtrl.dismiss({ compartir: false });
  }
}