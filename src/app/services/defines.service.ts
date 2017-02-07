import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { Materials } from '../defines';

@Injectable()
export class DefinesService {

  constructor() { 

  }

  public commonResources = _.filter(Materials, {level: 1});

}