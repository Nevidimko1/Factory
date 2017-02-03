import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'default-menu',
  styleUrls: [
    './defaultMenu.component.css'
  ],
  template: `
    <div class="options">
      <a [routerLink]="['newGame']"><h3>Новая игра</h3></a>
      <a [routerLink]="['/main']"><h3>Продолжить</h3></a>
    </div>
  `
})
export class DefaultMenuComponent implements OnInit {

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
