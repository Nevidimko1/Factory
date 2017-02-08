import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
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
  public inStorage: String;

  private minTickerValue: number = 0;

  constructor(
    public storageService: StorageService,
    private resourceItemService: ResourceItemService
  ) {
  }

  public localState: any;
  public ngOnInit() {      
    this.username = this.storageService.listen('name', this.updateName.bind(this));
    this.inStorage = this.storageService.listen('inventory['+this.info.id+']', this.updateInStorage.bind(this));
  }
  
  //callbacks
  private updateName = (val) => { this.username = val };
  private updateInStorage = (val) => { this.inStorage = val };

  public tickerChange(val) {
    console.log(this.info.name + ':', val);
  }

  public ngOnDestroy() {
    this.storageService.unlisten('name', this.updateName);
    this.storageService.unlisten('inventory['+this.info.id+']', this.updateInStorage);
  }

}
