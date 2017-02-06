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

  public username: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public storageService: StorageService
  ) {
    if(!this.storageService.initialized) {
      router.navigate(['menu']);
    } else {
      this.username = this.storageService.listen('name', this.updateName.bind(this));
    }
  }

  public incName() {
    this.storageService.setItem('name', (Number(this.username) + 1).toString());
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
