import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-side-nav> <router-outlet></router-outlet> </app-side-nav>',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kalev-web';
}
