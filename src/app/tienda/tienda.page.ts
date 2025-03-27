import { Component, OnInit } from '@angular/core'; // Importa los decoradores Component y OnInit desde Angular
import { AlertController } from '@ionic/angular'; // Importa AlertController de Ionic para mostrar alertas

@Component({
  selector: 'app-tienda', // Define el nombre del selector que se usará en el HTML
  templateUrl: './tienda.page.html', // Ruta del archivo HTML de esta página
  styleUrls: ['./tienda.page.scss'], // Ruta del archivo de estilos SCSS para esta página
  standalone: false // Esta opción se puede usar si se requiere usar la página en un módulo específico
})

export class TiendaPage implements OnInit {
  monedas: number = 600;
  compras: any[] = [];
  
  // Mascotas
  mascotaActual = { id: 4, precio: 70, imagen: 'assets/animales_base/vaca_KALEV.png' };
  mascotas = [
    { id: 1, nombre: 'Ajolote', precio: 90, imagen: 'assets/animales_base/ajolote_KALEV.png' },
    { id: 2, nombre: 'Lobo', precio: 50, imagen: 'assets/animales_base/lobo_KALEV.png' },
    { id: 3, nombre: 'Quetzal', precio: 50, imagen: 'assets/animales_base/quetzal_KALEV.png' },
    { id: 4, nombre: 'Vaca', precio: 70, imagen: 'assets/animales_base/vaca_KALEV.png' },
    { id: 5, nombre: 'Vaca Marina', precio: 40, imagen: 'assets/animales_base/vaca-marina_KALEV.png' }
  ];
  mascotasCompradas: any[] = [];

  // Accesorios Cabeza

  accesoriosCabeza = [
    { id: 1, nombre: 'Audifonos', precio: 50, imagen: 'assets/accesorios/cabeza/audifonos-accesorio_KALEV.png' },
    { id: 2, nombre: 'Gorro', precio: 75, imagen: 'assets/accesorios/cabeza/gorro-accesorio_KALEV.png' },
    { id: 3, nombre: 'Sombrero', precio: 60, imagen: 'assets/accesorios/cabeza/sombrero-accesorio_KALEV.png' }
  ];
  accesorioCabezaActual = this.accesoriosCabeza[0];
  accesoriosCabezaCompradas: any[] = [];

  // Accesorios Ojos

  accesoriosOjos = [
    { id: 1, nombre: 'Gafas Amarillas', precio: 50, imagen: 'assets/accesorios/ojos/gafas-3D.png' },
    { id: 2, nombre: 'Gafas Azules', precio: 75, imagen: 'assets/accesorios/ojos/gafas-corazon.png' },
    { id: 3, nombre: 'Parche', precio: 60, imagen: 'assets/accesorios/ojos/parche.png' }
  ];
  accesorioOjosActual = this.accesoriosOjos[0];

  accesoriosOjosComprados: any[] = [];

  constructor(private alertCtrl: AlertController) {}

  // Navegación mascotas
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

  // Navegación accesorios cabeza
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

  // Navegación accesorios ojos
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

  // Comprar funciones
  async guardarMascota() {
    if (this.monedas >= this.mascotaActual.precio) {
      if (!this.mascotasCompradas.some(m => m.id === this.mascotaActual.id)) {
        this.monedas -= this.mascotaActual.precio;
        this.mascotasCompradas.push({...this.mascotaActual});
        this.mascotas = this.mascotas.filter(m => m.id !== this.mascotaActual.id);
        
        if (this.mascotas.length > 0) {
          this.mascotaActual = this.mascotas[0];
        } else {
          this.mascotaActual = { id: 0, precio: 9, imagen: '' };
        }

        const alert = await this.alertCtrl.create({
          header: 'Mascota comprada!',
          message: 'Felicidades por tu compra',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Ya comprada',
          message: 'Ya tienes esta mascota',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes',
        message: 'No tienes suficientes monedas para esta mascota',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async guardarAccCabeza() {
    if (this.monedas >= this.accesorioCabezaActual.precio) {
      if (!this.accesoriosCabezaCompradas.some(a => a.id === this.accesorioCabezaActual.id)) {
        this.monedas -= this.accesorioCabezaActual.precio;
        this.accesoriosCabezaCompradas.push({...this.accesorioCabezaActual});
        this.accesoriosCabeza = this.accesoriosCabeza.filter(a => a.id !== this.accesorioCabezaActual.id);
        
        if (this.accesoriosCabeza.length > 0) {
          this.accesorioCabezaActual = this.accesoriosCabeza[0];
        } else {
          this.accesorioCabezaActual = { id: 0, nombre: 'No hay más accesorios', precio: 0, imagen: '' };
        }

        const alert = await this.alertCtrl.create({
          header: 'Accesorio comprado!',
          message: `Has comprado: ${this.accesorioCabezaActual.nombre}`,
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Ya comprado',
          message: 'Ya tienes este accesorio',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes',
        message: 'No tienes suficientes monedas para este accesorio',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async guardarAccOjos() {
    if (this.monedas >= this.accesorioOjosActual.precio) {
      if (!this.accesoriosOjosComprados.some(a => a.id === this.accesorioOjosActual.id)) {
        this.monedas -= this.accesorioOjosActual.precio;
        this.accesoriosOjosComprados.push({...this.accesorioOjosActual});
        this.accesoriosOjos = this.accesoriosOjos.filter(a => a.id !== this.accesorioOjosActual.id);
        
        if (this.accesoriosOjos.length > 0) {
          this.accesorioOjosActual = this.accesoriosOjos[0];
        } else {
          this.accesorioOjosActual = { id: 0, nombre: 'No hay más accesorios', precio: 0, imagen: '' };
        }

        const alert = await this.alertCtrl.create({
          header: 'Accesorio comprado!',
          message: `Has comprado: ${this.accesorioOjosActual.nombre}`,
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Ya comprado',
          message: 'Ya tienes este accesorio',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes',
        message: 'No tienes suficientes monedas para este accesorio',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {}
}