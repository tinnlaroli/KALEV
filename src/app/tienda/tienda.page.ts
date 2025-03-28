import { Component, OnInit } from '@angular/core'; // Importa los decoradores Component y OnInit desde Angular
import { AlertController } from '@ionic/angular'; // Importa AlertController de Ionic para mostrar alertas

@Component({
  selector: 'app-tienda', // Define el nombre del selector que se usará en el HTML
  templateUrl: './tienda.page.html', // Ruta del archivo HTML de esta página
  styleUrls: ['./tienda.page.scss'], // Ruta del archivo de estilos SCSS para esta página
  standalone: false // Esta opción se puede usar si se requiere usar la página en un módulo específico
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

  // Accesorios Ojos
  accesoriosOjos = [
    { id: 9, nombre: 'Gafas Amarillas', precio: 50, imagen: 'assets/accesorios/ojos/gafas-3D.png' },
    { id: 10, nombre: 'Gafas Azules', precio: 75, imagen: 'assets/accesorios/ojos/gafas-corazon.png' },
    { id: 11, nombre: 'Parche', precio: 60, imagen: 'assets/accesorios/ojos/parche.png' }
  ];
  accesorioOjosActual = this.accesoriosOjos[0];
  accesoriosOjosComprados: any[] = [];

  constructor(private alertCtrl: AlertController) {}


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


  mascotaComprada(id: number): boolean {
    return this.mascotasCompradas.some(m => m.id === id);
  }

  accesorioCabezaComprado(id: number): boolean {
    return this.accesoriosCabezaCompradas.some(a => a.id === id);
  }

  accesorioOjosComprado(id: number): boolean {
    return this.accesoriosOjosComprados.some(a => a.id === id);
  }


  async comprarMascota() {
    if (this.monedas >= this.mascotaActual.precio) {
      this.monedas -= this.mascotaActual.precio;
      this.mascotasCompradas.push({...this.mascotaActual});
      
      const alert = await this.alertCtrl.create({
        header: '¡Compra exitosa!',
        message: `Has comprado: ${this.mascotaActual.nombre}`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes',
        message: 'No tienes suficientes monedas para esta mascota',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async comprarAccesorioCabeza() {
    if (this.monedas >= this.accesorioCabezaActual.precio) {
      this.monedas -= this.accesorioCabezaActual.precio;
      this.accesoriosCabezaCompradas.push({...this.accesorioCabezaActual});
      
      const alert = await this.alertCtrl.create({
        header: '¡Compra exitosa!',
        message: `Has comprado: ${this.accesorioCabezaActual.nombre}`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes',
        message: 'No tienes suficientes monedas para este accesorio',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async comprarAccesorioOjos() {
    if (this.monedas >= this.accesorioOjosActual.precio) {
      this.monedas -= this.accesorioOjosActual.precio;
      this.accesoriosOjosComprados.push({...this.accesorioOjosActual});
      
      const alert = await this.alertCtrl.create({
        header: '¡Compra exitosa!',
        message: `Has comprado: ${this.accesorioOjosActual.nombre}`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes',
        message: 'No tienes suficientes monedas para este accesorio',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Propiedades para los items seleccionados
  mascotaSeleccionada: any = { imagen: 'assets/animales_base/vaca_KALEV.png' };
  accesorioCabezaSeleccionado: any = null;
  accesorioOjosSeleccionado: any = null;

  // ... (código anterior)

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

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  

  ngOnInit() {}
}

