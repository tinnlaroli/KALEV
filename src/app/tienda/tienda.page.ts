import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ConfirmacionCompraComponent } from '../components/confirmacion-compra/confirmacion-compra.component';
import { CompraExitosaComponent } from '../components/compra-exitosa/compra-exitosa.component';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: false
})
export class TiendaPage implements OnInit {
  monedas: number = 1000;
  cargando: boolean = false;
  nombrePersonalizado: string = '';
  mascotaAPersonalizar: any = null;

  mascotaActual = {
    id: 4,
    nombre: 'Vaca',
    precio: 70,
    imagen: 'assets/animales_base/vaca_KALEV.png',
  };

  mascotas = [
    { id: 1, nombre: 'Ajolote', precio: 90, imagen: 'assets/animales_base/ajolote_KALEV.png' },
    { id: 2, nombre: 'Lobo', precio: 50, imagen: 'assets/animales_base/lobo_KALEV.png' },
    { id: 3, nombre: 'Quetzal', precio: 60, imagen: 'assets/animales_base/quetzal_KALEV.png' },
    { id: 4, nombre: 'Vaca', precio: 0, imagen: 'assets/animales_base/vaca_KALEV.png' },
    { id: 5, nombre: 'Vaca Marina', precio: 40, imagen: 'assets/animales_base/vaca-marina_KALEV.png' },
  ];

  accesoriosCabeza = [
    { id: 6, nombre: 'Audifonos', precio: 50, imagen: 'assets/accesorios/cabeza/audifonos-accesorio_KALEV.png' },
    { id: 7, nombre: 'Gorro', precio: 75, imagen: 'assets/accesorios/cabeza/gorro-accesorio_KALEV.png' },
    { id: 8, nombre: 'Sombrero', precio: 60, imagen: 'assets/accesorios/cabeza/sombrero-accesorio_KALEV.png' },
  ];

  accesoriosOjos = [
    { id: 9, nombre: 'Gafas Amarillas', precio: 50, imagen: 'assets/accesorios/ojos/gafas-3D.png' },
    { id: 10, nombre: 'Gafas Azules', precio: 75, imagen: 'assets/accesorios/ojos/gafas-corazon.png' },
    { id: 11, nombre: 'Parche', precio: 60, imagen: 'assets/accesorios/ojos/parche.png' },
  ];

  mascotasCompradas: any[] = [];
  accesoriosCabezaComprados: any[] = [];
  accesoriosOjosComprados: any[] = [];

  mascotaSeleccionada: any = { imagen: 'assets/animales_base/vaca_KALEV.png' };
  accesorioCabezaSeleccionado: any = null;
  accesorioOjosSeleccionado: any = null;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.storage.create();
  }

  async ngOnInit() {
    await this.cargarDatosIniciales();
  }

  async cargarDatosIniciales() {
    const loading = await this.mostrarLoading('Cargando datos...');
    try {
      this.monedas = (await this.storage.get('monedas')) ?? 1000;
      this.mascotaSeleccionada = (await this.storage.get('selected_pet')) || this.mascotaSeleccionada;

      const accesorios = await this.storage.get('selected_accessories');
      if (accesorios) {
        this.accesorioCabezaSeleccionado = accesorios.cabeza;
        this.accesorioOjosSeleccionado = accesorios.ojos;
      }

      this.mascotasCompradas = await this.storage.get('mascotas_compradas') || this.mascotas.filter(m => m.precio === 0);
      this.accesoriosCabezaComprados = await this.storage.get('accesorios_cabeza_comprados') || [];
      this.accesoriosOjosComprados = await this.storage.get('accesorios_ojos_comprados') || [];
    } catch (error) {
      console.error('Error al cargar datos:', error);
      await this.mostrarAlerta('Error', 'No se pudieron cargar los datos iniciales');
    } finally {
      await loading.dismiss();
    }
  }

  async personalizarMascota() {
    if (!this.nombrePersonalizado || !this.mascotaAPersonalizar) {
      await this.mostrarAlerta('Error', 'Por favor completa todos los campos');
      return;
    }

    if (this.nombrePersonalizado.length < 2 || this.nombrePersonalizado.length > 20) {
      await this.mostrarAlerta('Error', 'El nombre debe tener entre 2 y 20 caracteres');
      return;
    }

    const index = this.mascotasCompradas.findIndex(m => m.id === this.mascotaAPersonalizar.id);
    if (index !== -1) {
      this.mascotasCompradas[index].nombre = this.nombrePersonalizado;
      await this.storage.set('mascotas_compradas', this.mascotasCompradas);

      if (this.mascotaSeleccionada.id === this.mascotaAPersonalizar.id) {
        this.mascotaSeleccionada = this.mascotasCompradas[index];
        await this.storage.set('selected_pet', this.mascotaSeleccionada);
      }

      await this.mostrarAlerta('Éxito', `¡${this.nombrePersonalizado} personalizado con éxito!`);
      this.nombrePersonalizado = '';
      this.mascotaAPersonalizar = null;
    }
  }

  async comprarMascota() {
    if (this.monedas < this.mascotaActual.precio) {
      await this.mostrarAlerta('Error', 'No tienes suficientes monedas');
      return;
    }

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
      await this.procesarCompra(this.mascotaActual, 'mascota');
    }
  }

  async comprarAccesorio(accesorio: any, tipo: string) {
    if (this.monedas < accesorio.precio) {
      await this.mostrarAlerta('Error', 'No tienes suficientes monedas');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: ConfirmacionCompraComponent,
      componentProps: {
        item: accesorio,
        monedasDisponibles: this.monedas
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.confirmado) {
      await this.procesarCompra(accesorio, tipo);
    }
  }

  async procesarCompra(item: any, tipo: string) {
    const loading = await this.mostrarLoading('Procesando compra...');

    try {
      this.monedas -= item.precio;
      await this.storage.set('monedas', this.monedas);

      switch (tipo) {
        case 'mascota':
          this.mascotasCompradas.push({...item});
          await this.storage.set('mascotas_compradas', this.mascotasCompradas);
          break;
        case 'accesorio-cabeza':
          this.accesoriosCabezaComprados.push({...item});
          await this.storage.set('accesorios_cabeza_comprados', this.accesoriosCabezaComprados);
          break;
        case 'accesorio-ojos':
          this.accesoriosOjosComprados.push({...item});
          await this.storage.set('accesorios_ojos_comprados', this.accesoriosOjosComprados);
          break;
      }

      await loading.dismiss();
      await this.mostrarCompraExitosa(item);
    } catch (error) {
      console.error('Error en la compra:', error);
      await loading.dismiss();
      await this.mostrarAlerta('Error', 'No se pudo completar la compra');
    }
  }

  async usarMascota(mascota: any) {
    this.mascotaSeleccionada = mascota;
    await this.storage.set('selected_pet', mascota);
    await this.mostrarAlerta('Éxito', `Ahora usas ${mascota.nombre}`);
  }

  async usarAccesorioCabeza(accesorio: any) {
    this.accesorioCabezaSeleccionado = accesorio;
    await this.guardarAccesorios();
  }

  async usarAccesorioOjos(accesorio: any) {
    this.accesorioOjosSeleccionado = accesorio;
    await this.guardarAccesorios();
  }

  async quitarAccesorioCabeza() {
    this.accesorioCabezaSeleccionado = null;
    await this.guardarAccesorios();
  }

  async quitarAccesorioOjos() {
    this.accesorioOjosSeleccionado = null;
    await this.guardarAccesorios();
  }

  private async guardarAccesorios() {
    await this.storage.set('selected_accessories', {
      cabeza: this.accesorioCabezaSeleccionado,
      ojos: this.accesorioOjosSeleccionado
    });
  }

  private async mostrarLoading(mensaje: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      spinner: 'crescent'
    });
    await loading.present();
    return loading;
  }

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async mostrarCompraExitosa(item: any) {
    const estudiante = {
      nombre: 'Estudiante Demo', // ⚠️ Puedes obtenerlo desde storage o un servicio real
      correo: 'demo@kalev.com'
    };
  
    const modal = await this.modalCtrl.create({
      component: CompraExitosaComponent,
      componentProps: {
        itemComprado: item,
        estudiante: estudiante
      }
    });

    
    await modal.present();
  }
  

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

  mascotaComprada(id: number): boolean {
    return this.mascotasCompradas.some(m => m.id === id);
  }

  accesorioCabezaComprado(id: number): boolean {
    return this.accesoriosCabezaComprados.some(a => a.id === id);
  }

  accesorioOjosComprado(id: number): boolean {
    return this.accesoriosOjosComprados.some(a => a.id === id);
  }

  tieneAccesorios(): boolean {
    return this.accesorioCabezaSeleccionado !== null || 
           this.accesorioOjosSeleccionado !== null;
  }
}