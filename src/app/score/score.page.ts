import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CongratulationsModalComponent } from '../congratulations-modal/congratulations-modal.component';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  standalone: false
})
export class ScorePage implements OnInit {
  score: number = 0;
  level: number = 1;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalController: ModalController,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    console.log('👉 Entró a ScorePage');
    this.score = parseInt(this.route.snapshot.queryParamMap.get('value') || '0');
    this.level = parseInt(this.route.snapshot.queryParamMap.get('level') || '1');
  
    console.log('🔎 Obteniendo ID del jugador...');
    const idJugador = await this.apiService.getCurrentEstudianteId(); // Asumimos que el jugador es el estudiante
    console.log('🎮 ID jugador obtenido:', idJugador);
    const idJuego = 1; // Cambia si usas diferentes juegos
    const puntuacion = this.score * 10; // Por ejemplo, 7 respuestas → 70 pts
    const tiempo = '00:03:00'; // ⚠️ Aquí deberías calcular el tiempo real si lo tienes
    const fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const intentos = 1; // Puedes incrementarlo si permites reintentos
    const progreso = this.score / 7; // Máximo 1.0
  
    if (idJugador) {
      const metricas = {
        id_juego: idJuego,
        id_jugador: idJugador,
        puntuacion,
        tiempo_empleado: tiempo,
        fecha_completado: fecha,
        intentos,
        progreso_porcentaje: progreso
      };
  
      this.apiService.registrarMetricasJuego(metricas).subscribe({
        next: (res) => 
          console.log('Métricas enviadas correctamente', res),
        error: err => console.error('Error al enviar métricas:', err)
      });
    }
  
    if (this.score >= 5) {
      await this.showCongratulationsModal();
    }
  }
  

  async showCongratulationsModal() {
    const modal = await this.modalController.create({
      component: CongratulationsModalComponent,
      componentProps: { level: this.level }
    });
    await modal.present();
  }
}
