import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService, DefinesService } from '../../../services';

@Component({
  selector: 'res-item',
  styleUrls: [
    './resourceItem.component.css'
  ],
  templateUrl: './resourceItem.component.html'
})
export class ResourceItem implements OnInit {

  @Input() public info; 
  public username: String;
  public inStorage: String;

  constructor(
    public route: ActivatedRoute,
    public storageService: StorageService
  ) {
  }

  //callbacks
  private updateName = (val) => { this.username = val };
  private updateInStorage = (val) => { this.inStorage = val };

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

  public ngOnDestroy() {
    this.storageService.unlisten('name', this.updateName);
    this.storageService.unlisten('inventory['+this.info.id+']', this.updateInStorage);
  }

}
