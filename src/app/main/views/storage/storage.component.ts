import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { StorageService, Actions } from '../../../services';

@Component({
  selector: 'storage',
  styles: [`
    .list {
      display: inline-block;
      overflow-y: auto;
      height: calc(100% - 40px);
      width: 100%;
    }
  `],
  template: `
    <div class="col-xs-12 h4">Склад</div>
    <div class="list">
      <div class="res-list">
        <res-item *ngFor="let res of materialsList" [info]="res"></res-item>
      </div>
    </div>
  `
})
export class StorageComponent{
  private materialsList;  

  constructor(
    private storageService: StorageService,
    private store: Store<any>
  ) {

  }

  public ngOnInit() {
    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = _.filter(list, o => o.level !== 1);
      });
  }
}
