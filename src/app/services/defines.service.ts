import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

export interface Resource {
  icon;
  name;
  level;
  price;
  id;
};

@Injectable()
export class DefinesService {
  private _materials;
  private _commonResources;
  private _craftableResources;

  constructor(
    private http: Http
  ) {
    let data = this.http.get('assets/materials.json');

    this._materials = data
      .map(res => res.json());

    this._commonResources = data
      .map(res => _.filter(res.json(), {level: 1}));

    this._craftableResources = data
      .map(res => _.filter(res.json(), (r: Resource) => !r.level));
  }

  public get commonResources() {
    return this._commonResources;
  }

  public get craftableResources() {
    return this._craftableResources;
  }

}