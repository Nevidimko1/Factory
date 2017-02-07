import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    public route: ActivatedRoute,
    public storageService: StorageService,
    private resourceItemService: ResourceItemService
  ) {
  }

  public localState: any;
  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
      
    this.username = this.storageService.listen('name', this.updateName.bind(this));
    this.inStorage = this.storageService.listen('inventory['+this.info.id+']', this.updateInStorage.bind(this));
  }
  
  //callbacks
  private updateName = (val) => { this.username = val };
  private updateInStorage = (val) => { this.inStorage = val };

  @Output() tickerChange:Function;
  public tickerChangeCb(val) {
    //console.log(this.info.name + ':', val);
    console.log(val);
  }

  public ngOnDestroy() {
    this.storageService.unlisten('name', this.updateName);
    this.storageService.unlisten('inventory['+this.info.id+']', this.updateInStorage);
  }

}
