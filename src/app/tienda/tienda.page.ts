import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: false
})
export class TiendaPage implements OnInit {
  monedas: number = 300; // Monedas iniciales

  mascotaActual = { imagen: 'assets/icon/pierre.png' }; // Mascota por defecto
  mascotas = [
    { id: 1, imagen: 'assets/icon/pierre.png' },
    { id: 2, imagen: 'assets/icon/quetzal.png' },
    { id: 3, imagen: 'assets/icon/muricia.png' },
    { id: 4, imagen: 'assets/icon/gero.png' },
    { id: 5, imagen: 'assets/icon/tortuga.png' },
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
    { id: 12, nombre: 'Manchas moradas', precio: 120, imagen: 'assets/ropa/manchas-moradas.png' },
  ];

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  async comprar(item: any) {
    if (this.monedas >= item.precio) {
      this.monedas -= item.precio;
      const toast = await this.toastCtrl.create({
        message: `¡Compraste ${item.nombre}!`,
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas Insuficientes',
        message: 'No tienes suficientes monedas para esta compra.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  cambiarMascota() {
    const indiceActual = this.mascotas.findIndex(m => m.imagen === this.mascotaActual.imagen);
    this.mascotaActual = this.mascotas[(indiceActual + 1) % this.mascotas.length];
  }

  ngOnInit() {}
}
