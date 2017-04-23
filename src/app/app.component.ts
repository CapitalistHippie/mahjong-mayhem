import { Component } from '@angular/core';
import { MahjongMayhemApiService } from './mahjong-mayhem-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mahjong Mayhem';

  constructor(private mahjongMayhemApiService: MahjongMayhemApiService) {
  }
}
