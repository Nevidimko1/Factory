import {
  Component,
  OnInit,
  Input,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';

import { StorageService } from '../../../services';
import { ResourceItemService } from './resourceItem.service';

@Component({
  selector: 'res-item',
  styleUrls: [
    './resourceItem.component.css'
  ],
  templateUrl: './resourceItem.component.html',
  providers: [ResourceItemService]
})
export class ResourceItem implements OnInit {

  @Input() public info; 
  public username: String;
  public itemsInStore: number;

  private minTickerValue: number = 0;

  constructor(
    public storageService: StorageService,
    private store: Store<any>,
    private resourceItemService: ResourceItemService
  ) {}

  public ngOnInit() {
    this.username = this.storageService.listen('name', this.updateName.bind(this));

    this.store.select('InventoryReducer')
      .subscribe(list => this.itemsInStore = list[this.info.id] || 0);
  }

  private updateName = name => this.username = name;
  

  public ngOnDestroy() {
    this.storageService.unlisten('name', this.updateName);
  }

}
