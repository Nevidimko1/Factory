import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { StorageService } from '../../../services';

@Component({
  selector: 'shop',
  styleUrls: ['./shop.component.css'],
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  private materialsList;
  private behavior = 'buy';

  constructor(
    private storageService: StorageService,
    private store: Store<any>
  ) {

  }

  public ngOnInit() {
    this.store.select('ResourcesReducer')
      .subscribe((list: Array<Resource>) => {
        this.materialsList = _.filter(list, o => o.level === 1);
      });
  }


}
