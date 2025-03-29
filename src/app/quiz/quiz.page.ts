import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({ 
  selector: 'app-quiz', 
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: false 
})
export class QuizPage {
  levelId: number = 1;
  questions = [
    {
      text: '¿Cómo se llamaba el gato?',
      options: ['Lulo', 'Lolo', 'Michi', 'Tigre'],
      answer: 'Lulo'
    },
    {
      text: '¿Cómo era Lulo, el gato de Martín?',
      options: ['Tenía un pelaje suave y ojos verdes', 'Era muy travieso', 'Tenía un pelaje áspero y ojos azules', 'Era de color negro'],
      answer: 'Tenía un pelaje suave y ojos verdes'
    },
    {
      text: '¿Qué hizo Martín cuando no encontró a Lulo en su lugar habitual?',
      options: ['Fue al parque a buscarlo', 'Se acostó a dormir', 'Comenzó a buscarlo por toda la casa y el vecindario', 'Llamó a la policía'],
      answer: 'Comenzó a buscarlo por toda la casa y el vecindario'
    },
    {
      text: '¿Qué le sugirió la señora Carmen a Martín?',
      options: ['Que esperara a que Lulo regresara solo', 'Que Lulo podría estar en algún rincón que Martín no conociera', 'Que fuera al parque a buscarlo', 'Que llamara a sus amigos'],
      answer: 'Que Lulo podría estar en algún rincón que Martín no conociera'
    },
    {
      text: '¿Dónde encontró Martín a Lulo después de tanto buscar?',
      options: ['En el jardín', 'En la tienda de la esquina', 'En la caja de zapatos escondida en su habitación', 'En la casa de Pedro'],
      answer: 'En la caja de zapatos escondida en su habitación'
    },
    {
      text: '¿Qué hizo Martín cuando encontró a Lulo en la caja de zapatos?',
      options: ['Lo regañó por asustarlo', 'Lo acarició y lo levantó en brazos', 'Lo dejó dormir más tiempo', 'Lo llevó al veterinario'],
      answer: 'Lo acarició y lo levantó en brazos'
    },
    {
      text: '¿Qué prometió Martín después de encontrar a Lulo?',
      options: ['No dejar que Lulo saliera más de casa', 'No preocuparse tanto, pero recordar que los gatos tienen lugares secretos donde dormir', 'Buscar a Lulo todos los días', 'No dejar que Lulo jugara más'],
      answer: 'No preocuparse tanto, pero recordar que los gatos tienen lugares secretos donde dormir'
    }
  ];
  
  currentIndex = 0;
  score = 0;

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {
    this.levelId = parseInt(this.route.snapshot.queryParamMap.get('level') || '1');
  }

  selectOption(option: string) {
    if (option === this.questions[this.currentIndex].answer) {
      this.score++;
    }
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.navCtrl.navigateForward(`/score?value=${this.score}&level=${this.levelId}`);
    }
  }
}