import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'menu',
  styleUrls: [
    './menu.component.css'
  ],
  template: `
    <div class="options">
      <a href=""><h2>Новая игра</h2></a>
      <a href=""><h2>Продолжить</h2></a>
    </div>
  `
})
export class MenuComponent implements OnInit {

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
