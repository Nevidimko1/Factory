import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'res-item',
  styleUrls: [
    './resourceItem.component.css'
  ],
  templateUrl: './resourceItem.component.html'
})
export class ResourceItem implements OnInit {

  @Input() public info;
  @Input() public selected;

  public itemsInStore: number;

  constructor(
    private store: Store<any>
  ) {}

  public ngOnInit() {
    this.store.select('InventoryReducer')
      .subscribe(list => this.itemsInStore = list[this.info.id] || 0);
  } 

}
