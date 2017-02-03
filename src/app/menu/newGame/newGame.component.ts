import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'new-game',
  styleUrls: [
    './newgame.component.css'
  ],
  template: `
    <div class="options">
      <h1>Новая игра</h1>
    </div>
  `
})
export class NewGameComponent implements OnInit {

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `Menu` component');
  }

}
