import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private title = 'Mahjong Mayhem';

  constructor(private authService: AuthService) {
  }
}
