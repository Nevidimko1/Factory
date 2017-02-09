import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import { DefinesService } from '../../../services';

@Component({
  selector: 'shop',
  styles: [`
    .list {
      display: inline-block;
      overflow-y: auto;
      height: calc(100% - 40px);
      width: 100%;
    }
  `],
  template: `
    <div class="col-xs-12 h4">Магазин</div>
    <div class="list">
      <div class="res-list">
        <res-item *ngFor="let res of materialsList" [info]="res"></res-item>
      </div>
    </div>
  `
})
export class ShopComponent{
  constructor(
    private zone: NgZone
  ) {
    this.zone.run(() => {
      console.log('resource zone');
    });
  }

  private materialsList = DefinesService.commonResources;

}
