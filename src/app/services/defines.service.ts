import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import '../defines/materiajs.json';

//import { Materials } from '../defines';

@Injectable()
export class DefinesService {

  constructor(
    private http: Http
  ) {}

  public commonResources() {
    return this.http.get('assets/materials.json')
                 .map(res => res.json());
  }
  //static commonResources = Materials;//_.filter(Materials, {level: 1});

}