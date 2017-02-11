import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services';

@Component({
  selector: 'default-menu',
  styleUrls: [
    './defaultMenu.component.css'
  ],
  template: `
    <div class="options">
      <a (click)="loadGame()" *ngIf="saveGameExists"><h3>Продолжить</h3></a>
      <a [routerLink]="['newGame']"><h3>Новая игра</h3></a>
    </div>
  `
})
export class DefaultMenuComponent{

  public localState: any;
  public saveGameExists:boolean = false;
  constructor(
    public router: Router,
    public storageService: StorageService
  ) {
    this.saveGameExists = this.storageService.saveGameExists;
  }

  public loadGame():void {
    this.storageService.loadGame();
    if(this.storageService.initialized) {
      this.router.navigate(['/main']);
    }
  }

}
