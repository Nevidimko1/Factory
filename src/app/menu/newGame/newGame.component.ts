import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services';

@Component({
  selector: 'new-game',
  styleUrls: [
    './newgame.component.css'
  ],
  templateUrl: './newGame.component.html'
})
export class NewGameComponent implements OnInit {

  public localState: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public storageService: StorageService
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

  startGame(username) {
    this.storageService.createGame(username);
    this.router.navigate(['../../main']);
  }

}
