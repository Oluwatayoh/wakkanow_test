import { Component } from '@angular/core';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent {
  constructor(public authService: AuthService) { }

  logOutIcon = faDoorOpen;
}
