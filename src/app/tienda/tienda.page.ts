import { Component, OnInit } from '@angular/core'; // Importa los decoradores Component y OnInit desde Angular
import { AlertController } from '@ionic/angular'; // Importa AlertController de Ionic para mostrar alertas

@Component({
  selector: 'app-tienda', // Define el nombre del selector que se usará en el HTML
  templateUrl: './tienda.page.html', // Ruta del archivo HTML de esta página
  styleUrls: ['./tienda.page.scss'], // Ruta del archivo de estilos SCSS para esta página
  standalone: false // Esta opción se puede usar si se requiere usar la página en un módulo específico
})
export class TiendaPage implements OnInit {
  // Propiedad que almacena las monedas disponibles del usuario
  monedas: number = 600; 

  // Lista que almacena los artículos comprados
  compras: any[] = []; 

  // Propiedad para almacenar la mascota actual seleccionada
  mascotaActual = { imagen: 'assets/icon/pierre.png' }; 

  // Arreglo con todas las mascotas disponibles en la tienda
  mascotas = [
    { id: 1, imagen: 'assets/icon/pierre.png' },
    { id: 2, imagen: 'assets/icon/muricia.png' },
    { id: 3, imagen: 'assets/icon/quetzal.png' },
    { id: 4, imagen: 'assets/icon/gero.png' }
  ];

  // Arreglo que almacena todos los artículos disponibles en la tienda
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

  // Inyección del AlertController para mostrar alertas
  constructor(private alertCtrl: AlertController) {}

  // Función para realizar la compra de un artículo
  async comprar(item: any) {
    // Verifica si el artículo ya fue comprado anteriormente
    if (this.compras.some(c => c.id === item.id)) {
      const alert = await this.alertCtrl.create({
        header: 'Ya compraste este artículo', // Título de la alerta
        message: 'No puedes comprar el mismo artículo dos veces.', // Mensaje de la alerta
        buttons: ['OK'] // Botón para cerrar la alerta
      });
      await alert.present(); // Muestra la alerta
      return; // Sale de la función si ya fue comprado
    }

    // Verifica si el usuario tiene suficientes monedas para la compra
    if (this.monedas >= item.precio) {
      let saldoAnterior = this.monedas; // Guarda el saldo antes de la compra
      this.monedas -= item.precio; // Descuenta el precio del artículo de las monedas
      let saldoActual = this.monedas; // Guarda el saldo después de la compra
      this.compras.push({
        ...item, // Copia los detalles del artículo
        fecha: new Date().toLocaleString(), // Guarda la fecha de la compra
        saldoAnterior, // Incluye el saldo anterior
        saldoActual // Incluye el saldo actual
      });

      const alert = await this.alertCtrl.create({
        header: '¡Compra exitosa!', // Título de la alerta de compra exitosa
        message: 
          `Has comprado: ${item.nombre}\n` + // Nombre del artículo comprado
          `Fecha: ${new Date().toLocaleString()}\n` + // Fecha de compra
          `Saldo anterior: ${saldoAnterior} monedas\n` + // Saldo antes de la compra
          `Costo del producto: ${item.precio} monedas\n` + // Precio del artículo
          `Saldo actual: ${saldoActual} monedas`, // Saldo después de la compra
        buttons: ['OK'] // Botón para cerrar la alerta
      });
      await alert.present(); // Muestra la alerta de compra exitosa
    } else {
      // Si no tiene suficientes monedas, muestra un mensaje de error
      const alert = await this.alertCtrl.create({
        header: 'Monedas insuficientes', // Título de la alerta de error
        message: 'No tienes suficientes monedas para esta compra.', // Mensaje de la alerta
        buttons: ['OK'] // Botón para cerrar la alerta
      });
      await alert.present(); // Muestra la alerta de error
    }
  }

  // Función para verificar si un artículo ya fue comprado
  fueComprado(item: any): boolean {
    return this.compras.some(c => c.id === item.id); // Retorna true si el artículo está en la lista de compras
  }

  // Función para cambiar la mascota seleccionada
  cambiarMascota() {
    // Encuentra el índice de la mascota actual en el arreglo de mascotas
    const indiceActual = this.mascotas.findIndex(m => m.imagen === this.mascotaActual.imagen);
    // Cambia la mascota a la siguiente en la lista (y vuelve al inicio si es la última)
    this.mascotaActual = this.mascotas[(indiceActual + 1) % this.mascotas.length];
  }

  // Método de inicialización del componente
  ngOnInit() {}
}
