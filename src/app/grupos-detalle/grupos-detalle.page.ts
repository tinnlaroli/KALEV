import { Component, Input } from '@angular/core';  // Importa los decoradores Component e Input de Angular
import { ModalController } from '@ionic/angular';  // Importa ModalController de Ionic para gestionar modales

@Component({
  selector: 'app-grupos-detalle',  // Define el selector para el componente, que se usará en la plantilla
  templateUrl: './grupos-detalle.page.html',  // Define la ubicación del archivo HTML asociado con el componente
  styleUrls: ['./grupos-detalle.page.scss'],  // Define la ubicación del archivo de estilos CSS asociado con el componente
  standalone: false  // Indica que este componente no es autónomo, depende de otros módulos
})
export class GruposDetallePage {
  @Input() grupo: any;  // Recibe el objeto "grupo" desde el componente padre. El decorador Input hace que este atributo sea accesible desde el componente padre.

  constructor(private modalCtrl: ModalController) {}  // Inyecta el ModalController en el constructor para gestionar la creación y el cierre de modales.

  cerrar() {
    this.modalCtrl.dismiss();  // Método para cerrar el modal. Utiliza el ModalController para cerrar el modal actual.
  }
}