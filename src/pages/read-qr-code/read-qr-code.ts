import { BasePage } from './../base-page.page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ReadQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read-qr-code',
  templateUrl: 'read-qr-code.html',
})
export class ReadQrCodePage extends BasePage {

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public alertCtrl: AlertController) {
        super(alertCtrl);
        this.pageTitle = "Lecture d'un QRCode";
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReadQrCodePage');
    }

}
