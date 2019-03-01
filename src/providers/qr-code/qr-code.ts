import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {

    constructor(public http: HttpClient) {
        
    }

    generate(text: string): Promise<string> {
        //TODO: Code this
        return Promise.resolve('');
    }

}
