import {NgModule} from "@angular/core";
import {LocalStorageService, SessionStorageService} from "./service";
    
export * from './decorator'
export * from './service'
export * from './utility'

@NgModule({
    providers: [LocalStorageService, SessionStorageService]
})
export class WebStorageModule {}