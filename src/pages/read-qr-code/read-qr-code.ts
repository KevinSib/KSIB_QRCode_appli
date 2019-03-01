import { ScannerError } from './../../models/scanner.error.enum';
import { QrCodeProvider } from './../../providers/qr-code/qr-code';
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
                public alertCtrl: AlertController,
                private qrCodeProvider: QrCodeProvider) {
        super(alertCtrl);
        this.pageTitle = "Lecture d'un QRCode";
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReadQrCodePage');
    }

    openFile(): void {

    }

    openScanner(): void {
        this.qrCodeProvider.scanQRCode()
            .then((txt) => {
                this.showMessage('QRCode', 'Le QRCode contient : ' + txt);
            })
            .catch((err) => {
                if (err === ScannerError.PERMISSION_DENIED || err === ScannerError.PERMISSION_DENIED_PERMANENTLY) {
                    this.showMessage('Oups !', 'Nous ne pouvons pas scanner sans votre permission. Merci d\'accèder à vos permissions et d\'accepter la permission de la camera');
                } else {
                    this.showMessage('Oups !', 'Une erreur est survenue. Merci de réessayer plus tard.');
                }
            });
    }

}
