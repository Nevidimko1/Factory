import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
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
  private _data;

  private _materials;
  private _commonResources;
  private _craftableResources;

  constructor(
    private http: Http,
    private jsonp: Jsonp
  ) {
    this._data = this.http.get('assets/materials.json');

    this._data.subscribe(res => this._materials = res.json());

    this._commonResources = this._data
      .map(res => {
        let r = res.json();
        return _.filter(r, {level: 1});
      });

    this._craftableResources = this._data
      .map(res => _.filter(res.json(), (r: Resource) => !r.level));
  }

  public get commonResources() {
    return this._commonResources;
  }

  public get craftableResources() {
    return this._craftableResources;
  }

  public get materialsStatic() {
    return this._materials || [];
  }

}