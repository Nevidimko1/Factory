import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services';

@Component({
  selector: 'new-game',
  styleUrls: [
    './newgame.component.css'
  ],
  templateUrl: './newGame.component.html'
})
export class NewGameComponent{

  constructor(
    public router: Router,
    public storageService: StorageService
  ) {}

  startGame(username) {
    this.storageService.createGame(username);
    this.router.navigate(['../../main']);
  }

}
