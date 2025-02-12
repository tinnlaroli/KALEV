import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
  standalone: false
})
export class GruposPage implements OnInit {
  grupos = [
    {
      grado: '1',
      nombre: 'A',
      maestro: 'Laura García García',
      numeroAlumnos: 25,
    },
    {
      grado: '4',
      nombre: 'B',
      maestro: 'Laura García García',
      numeroAlumnos: 30,
    },
    {
      grado: '6',
      nombre: 'A',
      maestro: 'Laura García García',
      numeroAlumnos: 28,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
