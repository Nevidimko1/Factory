import {
  Component,
  OnInit
} from '@angular/core';

import { StorageService, DefinesService } from '../../../services';

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
        <res-item *ngFor="let res of materialsList | async" [info]="res"></res-item>
      </div>
    </div>
  `
})
export class ShopComponent implements OnInit {
  private materialsList;  

  constructor(
    private definesService: DefinesService,
    private storageService: StorageService
  ) {

  }

  public ngOnInit() {
    if(this.storageService.initialized)
      this.materialsList = this.definesService.commonResources;
  }


}
