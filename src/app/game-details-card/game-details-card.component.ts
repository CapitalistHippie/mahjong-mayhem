import { Component, OnInit, Input } from '@angular/core';

// Models.
import { Game } from '../models';

@Component({
  selector: 'app-game-details-card',
  templateUrl: './game-details-card.component.html',
  styleUrls: ['./game-details-card.component.scss']
})
export class GameDetailsCardComponent implements OnInit {

  @Input() game: Game;

  constructor() {
  }

  ngOnInit() {
  }
}
