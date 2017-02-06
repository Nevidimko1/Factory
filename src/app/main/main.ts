import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services';
import { LocalStorage, WebStorage } from "../services";

@Component({
  selector: 'main-game',
  styleUrls: [
    './main.css'
  ],
  templateUrl: './main.html'
})
export class Main implements OnInit {

  @LocalStorage('name') public username: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public storageService: StorageService
  ) {
    if(!this.storageService.initialized) {
      router.navigate(['menu']);
    } else {
      this.storageService.listen('name', ((val) => (this.username = val)).bind(this));
    }
  }

  public localState: any;

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

}
