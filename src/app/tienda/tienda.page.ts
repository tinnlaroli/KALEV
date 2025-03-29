import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ConfirmacionCompraComponent } from '../components/confirmacion-compra/confirmacion-compra.component';
import { CompraExitosaComponent } from '../components/compra-exitosa/compra-exitosa.component';
import { Share } from '@capacitor/share';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: false
})
export class TiendaPage implements OnInit {
  monedas: number = 200;
  
  mascotaActual = { id: 4, nombre: 'Vaca', precio: 70, imagen: 'assets/animales_base/vaca_KALEV.png' };
  mascotas = [
    { id: 1, nombre: 'Ajolote', precio: 90, imagen: 'assets/animales_base/ajolote_KALEV.png' },
    { id: 2, nombre: 'Lobo', precio: 50, imagen: 'assets/animales_base/lobo_KALEV.png' },
    { id: 3, nombre: 'Quetzal', precio: 60, imagen: 'assets/animales_base/quetzal_KALEV.png' },
    { id: 4, nombre: 'Vaca', precio: 0, imagen: 'assets/animales_base/vaca_KALEV.png' },
    { id: 5, nombre: 'Vaca Marina', precio: 40, imagen: 'assets/animales_base/vaca-marina_KALEV.png' }
  ];

  mascotasCompradas: any[] = [];

  accesoriosCabeza = [
    { id: 6, nombre: 'Audifonos', precio: 50, imagen: 'assets/accesorios/cabeza/audifonos-accesorio_KALEV.png' },
    { id: 7, nombre: 'Gorro', precio: 75, imagen: 'assets/accesorios/cabeza/gorro-accesorio_KALEV.png' },
    { id: 8, nombre: 'Sombrero', precio: 60, imagen: 'assets/accesorios/cabeza/sombrero-accesorio_KALEV.png' }
  ];
  accesorioCabezaActual = this.accesoriosCabeza[0];
  accesoriosCabezaCompradas: any[] = [];

  accesoriosOjos = [
    { id: 9, nombre: 'Gafas Amarillas', precio: 50, imagen: 'assets/accesorios/ojos/gafas-3D.png' },
    { id: 10, nombre: 'Gafas Azules', precio: 75, imagen: 'assets/accesorios/ojos/gafas-corazon.png' },
    { id: 11, nombre: 'Parche', precio: 60, imagen: 'assets/accesorios/ojos/parche.png' }
  ];
  accesorioOjosActual = this.accesoriosOjos[0];
  accesoriosOjosComprados: any[] = [];

  mascotaSeleccionada: any = { imagen: 'assets/animales_base/vaca_KALEV.png' };
  accesorioCabezaSeleccionado: any = null;
  accesorioOjosSeleccionado: any = null;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  // Métodos de navegación
  siguienteMascota() {
    const indiceActual = this.mascotas.findIndex(m => m.id === this.mascotaActual.id);
    const nuevoIndice = (indiceActual + 1) % this.mascotas.length;
    this.mascotaActual = this.mascotas[nuevoIndice];
  }
  
  anteriorMascota() {
    const indiceActual = this.mascotas.findIndex(m => m.id === this.mascotaActual.id);
    const nuevoIndice = (indiceActual - 1 + this.mascotas.length) % this.mascotas.length;
    this.mascotaActual = this.mascotas[nuevoIndice];
  }

  siguienteAccesorioCabeza() {
    const indiceActual = this.accesoriosCabeza.findIndex(a => a.id === this.accesorioCabezaActual.id);
    const nuevoIndice = (indiceActual + 1) % this.accesoriosCabeza.length;
    this.accesorioCabezaActual = this.accesoriosCabeza[nuevoIndice];
  }
  
  anteriorAccesorioCabeza() {
    const indiceActual = this.accesoriosCabeza.findIndex(a => a.id === this.accesorioCabezaActual.id);
    const nuevoIndice = (indiceActual - 1 + this.accesoriosCabeza.length) % this.accesoriosCabeza.length;
    this.accesorioCabezaActual = this.accesoriosCabeza[nuevoIndice];
  }

  siguienteAccesorioOjos() {
    const indiceActual = this.accesoriosOjos.findIndex(a => a.id === this.accesorioOjosActual.id);
    const nuevoIndice = (indiceActual + 1) % this.accesoriosOjos.length;
    this.accesorioOjosActual = this.accesoriosOjos[nuevoIndice];
  }
  
  anteriorAccesorioOjos() {
    const indiceActual = this.accesoriosOjos.findIndex(a => a.id === this.accesorioOjosActual.id);
    const nuevoIndice = (indiceActual - 1 + this.accesoriosOjos.length) % this.accesoriosOjos.length;
    this.accesorioOjosActual = this.accesoriosOjos[nuevoIndice];
  }

  // Métodos de verificación de compra
  mascotaComprada(id: number): boolean {
    return this.mascotasCompradas.some(m => m.id === id);
  }

  accesorioCabezaComprado(id: number): boolean {
    return this.accesoriosCabezaCompradas.some(a => a.id === id);
  }

  accesorioOjosComprado(id: number): boolean {
    return this.accesoriosOjosComprados.some(a => a.id === id);
  }

  // Métodos de compra
  async comprarMascota() {
    const modal = await this.modalCtrl.create({
      component: ConfirmacionCompraComponent,
      componentProps: {
        item: this.mascotaActual,
        monedasDisponibles: this.monedas
      }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    
    if (data?.confirmado) {
      this.monedas -= this.mascotaActual.precio;
      this.mascotasCompradas.push({...this.mascotaActual});
      await this.mostrarSplashCompra(this.mascotaActual);
    }
  }

  async comprarAccesorioCabeza() {
    const modal = await this.modalCtrl.create({
      component: ConfirmacionCompraComponent,
      componentProps: {
        item: this.accesorioCabezaActual,
        monedasDisponibles: this.monedas
      }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    
    if (data?.confirmado) {
      this.monedas -= this.accesorioCabezaActual.precio;
      this.accesoriosCabezaCompradas.push({...this.accesorioCabezaActual});
      await this.mostrarSplashCompra(this.accesorioCabezaActual);
    }
  }

  async comprarAccesorioOjos() {
    const modal = await this.modalCtrl.create({
      component: ConfirmacionCompraComponent,
      componentProps: {
        item: this.accesorioOjosActual,
        monedasDisponibles: this.monedas
      }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    
    if (data?.confirmado) {
      this.monedas -= this.accesorioOjosActual.precio;
      this.accesoriosOjosComprados.push({...this.accesorioOjosActual});
      await this.mostrarSplashCompra(this.accesorioOjosActual);
    }
  }

  // Métodos para usar items
  usarMascota(mascota: any) {
    this.mascotaSeleccionada = mascota;
    this.mostrarAlerta('Mascota seleccionada', mascota.nombre);
  }

  usarAccesorioCabeza(accesorio: any) {
    this.accesorioCabezaSeleccionado = accesorio;
    this.mostrarAlerta('Accesorio seleccionado', accesorio.nombre);
  }

  usarAccesorioOjos(accesorio: any) {
    this.accesorioOjosSeleccionado = accesorio;
    this.mostrarAlerta('Accesorio seleccionado', accesorio.nombre);
  }

  // Métodos auxiliares
  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async mostrarSplashCompra(item: any) {
    const modal = await this.modalCtrl.create({
      component: CompraExitosaComponent,
      componentProps: {
        item: item,
        monedasRestantes: this.monedas
      },
      cssClass: 'compra-exitosa-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.compartir) {
      await this.compartirComprobante(item);
    }
  }

  private async compartirComprobante(item: any) {
    try {
      const pdfData = await this.generarComprobantePDF(item);
      
      await Share.share({
        title: `Compra de ${item.nombre}`,
        text: `Acabo de comprar ${item.nombre} en la tienda Kalev`,
        url: pdfData,
        dialogTitle: 'Compartir comprobante'
      });
    } catch (error) {
      console.error('Error al compartir:', error);
      this.mostrarAlerta('Error', 'No se pudo compartir el comprobante');
    }
  }

  private async generarComprobantePDF(item: any): Promise<string> {
    return new Promise((resolve) => {
      const doc = new jsPDF();
      
      // Encabezado
      doc.setFillColor(63, 81, 181);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text('Kalev Tienda', 105, 20, { align: 'center' });
      
      // Contenido
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.text('Comprobante de Compra', 105, 45, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Item: ${item.nombre}`, 20, 65);
      doc.text(`Precio: ${item.precio} monedas`, 20, 75);
      doc.text(`Monedas restantes: ${this.monedas}`, 20, 85);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 95);
      
      // Imagen (opcional)
      if (item.imagen) {
        const img = new Image();
        img.src = item.imagen;
        img.onload = () => {
          doc.addImage(img, 'PNG', 20, 105, 50, 50);
          resolve(doc.output('datauristring'));
        };
        img.onerror = () => {
          resolve(doc.output('datauristring'));
        };
      } else {
        resolve(doc.output('datauristring'));
      }
    });
  }
}