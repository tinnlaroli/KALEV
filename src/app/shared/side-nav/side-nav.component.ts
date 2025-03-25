import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})


export class SideNavComponent {
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    console.log('Usuario actual:', this.authService.getUser());
  }
  
}
