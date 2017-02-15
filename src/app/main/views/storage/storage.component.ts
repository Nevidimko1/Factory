import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { StorageService } from '../../../services';

@Component({
  selector: 'storage',
  styleUrls: ['./storage.component.css'],
  templateUrl: './storage.component.html'
})
export class StorageComponent{
  private materialsList;
  private behavior = 'sell';

  constructor(
    private storageService: StorageService,
    private store: Store<any>
  ) {

  }

  public ngOnInit() {
    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = list;
      });
  }
}
