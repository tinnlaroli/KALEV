import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-grupos-detalle',
  templateUrl: './grupos-detalle.page.html',
  styleUrls: ['./grupos-detalle.page.scss'],
  standalone: false
})
export class GruposDetallePage {
  @Input() grupo: any; // Recibimos el grupo seleccionado

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
