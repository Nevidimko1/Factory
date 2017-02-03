import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../app.service';

@Component({
  selector: 'main-game',
  styleUrls: [
    './main.css'
  ],
  templateUrl: './main.html'
})
export class Main implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public appState: AppState
  ) {}

  public localState: any;
  public username: string = this.appState.state['name'];

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

}
