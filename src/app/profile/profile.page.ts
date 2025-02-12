import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ctx = document.getElementById('spiderChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Kinestésico', 'Auditivo', 'Lectura', 'Escritura', 'Visual'],
        datasets: [
          {
            label: 'Desempeño',
            data: [80, 70, 60, 90, 75],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
          },
        ],
      },
    });
  }


}
