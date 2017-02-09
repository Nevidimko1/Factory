import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services';

@Component({
  selector: 'main-game',
  styleUrls: [
    './main.css'
  ],
  templateUrl: './main.html'
})
export class Main implements OnInit {

  public username: string;

  constructor(
    public router: Router,
    public storageService: StorageService
  ) {
    if(!this.storageService.initialized) {
      router.navigate(['menu']);
    } else {
      this.username = this.storageService.listen('name', this.updateName.bind(this));
    }
  }

  //callbacks
  private updateName = (val) => { this.username = val };

  public ngOnInit() {}

  public ngOnDestroy() {
    this.storageService.unlisten('name', this.updateName);
  }

}
