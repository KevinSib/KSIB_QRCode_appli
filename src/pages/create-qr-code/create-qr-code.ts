import { BasePage } from './../base-page.page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-qr-code',
  templateUrl: 'create-qr-code.html',
})
export class CreateQrCodePage extends BasePage {

    qrCodeInput: string = "";
    qrCodeGenerated: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        super();
        this.pageTitle = "Génération d'un QRCode";
    }

    generate(): void {

    }

    share(): void {

    }

}
