import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: false
})
export class TiendaPage implements OnInit {
  monedas: number = 300; // Monedas iniciales
  compras: any[] = []; // Lista de artículos comprados

  mascotaActual = { imagen: 'assets/icon/pierre.png' }; // Mascota por defecto
  mascotas = [
    { id: 1, imagen: 'assets/icon/pierre.png' },
    { id: 2, imagen: 'assets/icon/muricia.png' },
    { id: 3, imagen: 'assets/icon/quetzal.png' },
    { id: 4, imagen: 'assets/icon/gero.png' }
  ];

  tienda = [
    { id: 1, nombre: 'Gorro Rojo', precio: 50, imagen: 'assets/ropa/gorro-rojo.png' },
    { id: 2, nombre: 'Gafas Cool', precio: 75, imagen: 'assets/ropa/gafas.png' },
    { id: 3, nombre: 'Camiseta Azul', precio: 60, imagen: 'assets/ropa/camisa-azul.png' },
    { id: 4, nombre: 'Falda', precio: 140, imagen: 'assets/ropa/falda.png' },
    { id: 5, nombre: 'Huipil', precio: 250, imagen: 'assets/ropa/huipil.png' },
    { id: 6, nombre: 'Traje', precio: 150, imagen: 'assets/ropa/traje.png' },
    { id: 7, nombre: 'Vestido Jarocho', precio: 300, imagen: 'assets/ropa/vestido-jarocho.png' },
    { id: 8, nombre: 'Poncho', precio: 350, imagen: 'assets/ropa/poncho.png' },
    { id: 9, nombre: 'Manchas azules', precio: 100, imagen: 'assets/manchas/manchas-azules.png' },
    { id: 10, nombre: 'Manchas rosas', precio: 60, imagen: 'assets/manchas/manchas-rosas.png' },
    { id: 11, nombre: 'Manchas cafés', precio: 90, imagen: 'assets/manchas/manchas-cafe.png' },
    { id: 12, nombre: 'Manchas moradas', precio: 120, imagen: 'assets/manchas/manchas-moradas.png' }
  ];

  constructor(private alertCtrl: AlertController) {}

  async comprar(item: any) {
    if (this.compras.some(c => c.id === item.id)) {
      const alert = await this.alertCtrl.create({
        header: 'Ya compraste este artículo',
        message: 'No puedes comprar el mismo artículo dos veces.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.monedas >= item.precio) {
      this.monedas -= item.precio;
      this.compras.push(item); // Guardar la compra

      const alert = await this.alertCtrl.create({
        header: '¡Compra exitosa!',
        message: `Has comprado <strong>${item.nombre}</strong>.`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes',
        message: 'No tienes suficientes monedas para esta compra.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Función para verificar si un artículo ya fue comprado
  fueComprado(item: any): boolean {
    return this.compras.some(c => c.id === item.id);
  }

  cambiarMascota() {
    const indiceActual = this.mascotas.findIndex(m => m.imagen === this.mascotaActual.imagen);
    this.mascotaActual = this.mascotas[(indiceActual + 1) % this.mascotas.length];
  }

  ngOnInit() {}
}
