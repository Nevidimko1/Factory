import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services';

@Component({
  selector: 'default-menu',
  styleUrls: [
    './defaultMenu.component.css'
  ],
  template: `
    <div class="options">
      <a (click)="loadGame()" [hidden]="!saveGameExists"><h3>Продолжить</h3></a>
      <a [routerLink]="['newGame']"><h3>Новая игра</h3></a>
    </div>
  `
})
export class DefaultMenuComponent implements OnInit {

  public localState: any;
  public saveGameExists:boolean = false;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public storageService: StorageService
  ) {
    this.saveGameExists = this.storageService.saveGameExists;
  }

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `Menu` component');
  }

  public loadGame():void {
    this.storageService.loadGame();
    if(this.storageService.initialized) {
      this.router.navigate(['/main']);
    }
  }

}
