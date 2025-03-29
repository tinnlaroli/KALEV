import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
  standalone: false
})
export class StoryPage {
  levelId: number = 1;

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {
    this.levelId = parseInt(this.route.snapshot.queryParamMap.get('level') || '1');
  }

  startQuiz() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.navCtrl.navigateForward(`/quiz?level=${this.levelId}`);
  }
}
