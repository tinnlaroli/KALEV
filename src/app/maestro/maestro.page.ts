import { Component, OnInit } from '@angular/core';  // Importación de Component y OnInit desde Angular core, para definir el componente y su ciclo de vida

@Component({
  selector: 'app-maestro',  // Define el selector que se usará en el HTML para referenciar este componente
  templateUrl: './maestro.page.html',  // Ruta al archivo HTML que contiene la estructura del componente
  styleUrls: ['./maestro.page.scss'],  // Ruta al archivo SCSS que contiene los estilos específicos de este componente
  standalone: false  // Indica si el componente debe ser un componente independiente (standalone) o no (se depende de módulos externos)
})
export class MaestroPage implements OnInit {  // Define la clase del componente y asegura que implementa el ciclo de vida OnInit

  constructor() { }  // Constructor vacío. Puede usarse para inyectar dependencias si es necesario

  ngOnInit() {  // Método del ciclo de vida OnInit que se ejecuta cuando el componente es inicializado
    // Aquí se pueden agregar lógicas que se deben ejecutar al momento de la carga del componente
  }

}