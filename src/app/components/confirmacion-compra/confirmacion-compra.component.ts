import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.scss'],
  standalone: false
})
export class ConfirmacionCompraComponent {
  @Input() item: any;
  @Input() monedasDisponibles: number = 0;
  @Input() tipoItem: 'mascota' | 'accesorio' = 'mascota'; // Nuevo input

  constructor(private modalCtrl: ModalController) {}

  confirmar() {
    this.modalCtrl.dismiss({ 
      confirmado: true,
      item: this.item,
      tipo: this.tipoItem // Pasamos el tipo de item
    });
  }

  cancelar() {
    this.modalCtrl.dismiss({ confirmado: false });
  }

  get monedasRestantes(): number {
    return this.monedasDisponibles - this.item.precio;
  }

  get textoConfirmacion(): string {
    return `¿Comprar ${this.item.nombre} por ${this.item.precio} monedas?`;
  }
}

