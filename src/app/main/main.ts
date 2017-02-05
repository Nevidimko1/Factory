import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services';

@Component({
  selector: 'main-game',
  styleUrls: [
    './main.css'
  ],
  templateUrl: './main.html'
})
export class Main implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public storageService: StorageService
  ) {
    if(!this.storageService.initialized)
      router.navigate(['menu']);
  }

  public localState: any;
  public username: string = this.storageService.get('name');

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

}
