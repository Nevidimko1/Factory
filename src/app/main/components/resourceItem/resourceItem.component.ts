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

  @Input() public info: Object; 
  public username: string;

  constructor(
    public route: ActivatedRoute,
    public storageService: StorageService
  ) {
      this.username = this.storageService.listen('name', this.updateName.bind(this));
  }

  //callbacks
  private updateName = (val) => { this.username = val };

  public localState: any;
  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

  public ngOnDestroy() {
    this.storageService.unlisten('name', this.updateName);
  }

}
