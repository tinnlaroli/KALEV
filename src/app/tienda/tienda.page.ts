import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ConfirmacionCompraComponent } from '../components/confirmacion-compra/confirmacion-compra.component';
import { CompraExitosaComponent } from '../components/compra-exitosa/compra-exitosa.component';
import { ApiService } from '../services/api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: false
})
export class TiendaPage implements OnInit {
  // ========== ESTADO ==========
  monedas: number = 1000;
  cargando: boolean = false;
  nombrePersonalizado: string = '';
  mascotaAPersonalizar: any = null;

  // ========== CATÁLOGO ==========
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

  // ========== INVENTARIO ==========
  mascotasCompradas: any[] = [];
  accesoriosCabezaComprados: any[] = [];
  accesoriosOjosComprados: any[] = [];

  // ========== SELECCIONES ==========
  mascotaSeleccionada: any = { imagen: 'assets/animales_base/vaca_KALEV.png' };
  accesorioCabezaSeleccionado: any = null;
  accesorioOjosSeleccionado: any = null;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    await this.cargarDatosIniciales();
  }

  // ========== MÉTODOS DE CARGA ==========
  async cargarDatosIniciales() {
    const loading = await this.mostrarLoading('Cargando datos...');
    
    try {
      const estudiante = await this.apiService.getSavedStudent();
      if (!estudiante) {
        throw new Error('No se pudo cargar la información del estudiante');
      }

      this.monedas = estudiante.monedas || 1000;

      // Cargar mascota seleccionada
      const mascotaGuardada = await this.apiService.getSelectedPet();
      if (mascotaGuardada) {
        this.mascotaSeleccionada = mascotaGuardada;
      }

      // Cargar accesorios seleccionados
      const accesoriosGuardados = await this.apiService.getSelectedAccessories();
      if (accesoriosGuardados) {
        this.accesorioCabezaSeleccionado = accesoriosGuardados.cabeza;
        this.accesorioOjosSeleccionado = accesoriosGuardados.ojos;
      }

      // Cargar mascotas compradas (inicialmente solo las de precio 0)
      this.mascotasCompradas = this.mascotas.filter(m => m.precio === 0);

      // Opcional: Cargar historial de compras del servidor
      // await this.cargarHistorialCompras(estudiante.id_estudiante);

    } catch (error) {
      console.error('Error al cargar datos:', error);
      await this.mostrarAlerta('Error', 'No se pudieron cargar los datos iniciales');
    } finally {
      await loading.dismiss();
    }
  }

  // ========== MÉTODOS DE COMPRA ==========
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
      const estudiante = await this.apiService.getSavedStudent();
      if (!estudiante) {
        throw new Error('No se encontró información del estudiante');
      }

      // Realizar la compra en el servidor
      await this.apiService.realizarCompra({
        id_usuario: estudiante.id_estudiante,
        id_item: item.id,
        cantidad: 1,
        costo_total: item.precio
      }).toPromise();

      // Actualizar estado local
      this.monedas -= item.precio;
      
      // Actualizar monedas en el storage
      estudiante.monedas = this.monedas;
      await this.apiService.saveAuthData(localStorage.getItem('token') || '', estudiante);

      // Agregar al inventario correspondiente
      switch (tipo) {
        case 'mascota':
          this.mascotasCompradas.push({...item});
          break;
        case 'accesorio-cabeza':
          this.accesoriosCabezaComprados.push({...item});
          break;
        case 'accesorio-ojos':
          this.accesoriosOjosComprados.push({...item});
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

  // ========== MÉTODOS DE PERSONALIZACIÓN ==========
  async personalizarMascota() {
    if (!this.nombrePersonalizado || !this.mascotaAPersonalizar) {
      await this.mostrarAlerta('Error', 'Por favor completa todos los campos');
      return;
    }
  
    if (this.nombrePersonalizado.length < 2 || this.nombrePersonalizado.length > 20) {
      await this.mostrarAlerta('Error', 'El nombre debe tener entre 2 y 20 caracteres');
      return;
    }
  
    const loading = await this.mostrarLoading('Personalizando mascota...');
  
    try {
      const estudiante = await this.apiService.getSavedStudent();
      if (!estudiante) {
        throw new Error('No se encontró información del estudiante');
      }
  
      // Crear la mascota en el servidor
      const mascotaCreada = await this.apiService.crearMascota({
        id_jugador: estudiante.id_estudiante,
        nombre_animal: this.nombrePersonalizado,
        tipo_animal: this.mascotaAPersonalizar.nombre.toLowerCase()
      }).toPromise();
  
      // Verificar que mascotaCreada no sea undefined
      if (!mascotaCreada || !mascotaCreada.id_animal) {
        throw new Error('No se recibió una respuesta válida al crear la mascota');
      }
  
      // Actualizar el estado local
      const mascotaActualizada = {
        ...this.mascotaAPersonalizar,
        id: mascotaCreada.id_animal,
        nombre: this.nombrePersonalizado,
        nombreOriginal: this.mascotaAPersonalizar.nombre // Mantener el nombre original como referencia
      };
  
      // Actualizar mascotas compradas
      const index = this.mascotasCompradas.findIndex(m => m.id === this.mascotaAPersonalizar.id);
      if (index !== -1) {
        this.mascotasCompradas[index] = {...mascotaActualizada};
      }
  
      // Actualizar mascota seleccionada si es la misma
      if (this.mascotaSeleccionada.id === this.mascotaAPersonalizar.id) {
        this.mascotaSeleccionada = {...mascotaActualizada};
        await this.apiService.saveSelectedPet(mascotaActualizada);
      }
  
      // Actualizar la lista de mascotas disponibles
      const mascotaIndex = this.mascotas.findIndex(m => m.id === this.mascotaAPersonalizar.id);
      if (mascotaIndex !== -1) {
        this.mascotas[mascotaIndex] = {...mascotaActualizada};
      }
  
      await loading.dismiss();
      await this.mostrarAlerta('Éxito', `¡${this.nombrePersonalizado} personalizado con éxito!`);
      this.resetFormularioPersonalizacion();
  
    } catch (error: any) {
      await loading.dismiss();
      console.error('Error en personalización:', error);
      const mensaje = error.error?.message || error.message || 'Ocurrió un error al personalizar la mascota';
      await this.mostrarAlerta('Error', mensaje);
    }
  }

  // ========== MÉTODOS DE SELECCIÓN ==========
  async seleccionarMascotaParaPersonalizar(mascota: any) {
    this.mascotaAPersonalizar = mascota;
    this.nombrePersonalizado = mascota.nombre;
  }

  async usarMascota(mascota: any) {
    this.mascotaSeleccionada = mascota;
    await this.apiService.saveSelectedPet(mascota);
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
    await this.apiService.saveSelectedAccessories({
      cabeza: this.accesorioCabezaSeleccionado,
      ojos: this.accesorioOjosSeleccionado
    });
  }

  // ========== MÉTODOS AUXILIARES ==========
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
    const modal = await this.modalCtrl.create({
      component: CompraExitosaComponent,
      componentProps: {
        item: item,
        monedasRestantes: this.monedas
      }
    });
    await modal.present();
  }

  private resetFormularioPersonalizacion() {
    this.nombrePersonalizado = '';
    this.mascotaAPersonalizar = null;
  }

  // ========== NAVEGACIÓN CATÁLOGO ==========
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

  // ========== HELPERS ==========
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