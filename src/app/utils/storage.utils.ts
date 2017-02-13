import { Injectable } from '@angular/core';

@Injectable()
export class StorageUtils {

  public static calculateUnsetPrices(materials, cb, prevUnsetCount?, force?) {
    var unsetCount = 0, p, it;
    materials.forEach(function (r, i) {
      if(!r.price && r.recipe) {
        if(force) {
          materials[i].price = 0;
        } else if (r.recipe && r.recipe.length) {
          p = 0;
          r.recipe.forEach(function (o) {
            it = materials[o[0]]
            p = p + it.price * o[1];
          });
          if(p) {
            p = p * (1.05 + (r.recipe.length - 1) * 0.23);
            materials[i].price = Math.round(p * 100) / 100;
          } else {
            unsetCount++;
          }
        } else {
          unsetCount++;
        }
      }
    });
    
    if(!prevUnsetCount || (unsetCount > 0 && unsetCount < prevUnsetCount))
      this.calculateUnsetPrices(materials, cb, unsetCount);
    else if(unsetCount > 0)
      this.calculateUnsetPrices(materials, cb, unsetCount, true);
    else
      cb(materials);
  }
}