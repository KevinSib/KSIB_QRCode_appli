import { QrCodeProvider } from './../../providers/qr-code/qr-code';
import { BasePage } from './../base-page.page';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRCodeComponent } from 'angularx-qrcode';
import domtoimage from 'dom-to-image';

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

    @ViewChild(QRCodeComponent) 
    private qrCodeRender: QRCodeComponent;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                private qrCodeProvider: QrCodeProvider) {
        super();
        this.pageTitle = "Génération d'un QRCode";
    }

    share(): void {
        const svgData = this.qrCodeRender.el.nativeElement;
        domtoimage.toBlob(svgData)
        .then((dataUrl) => {
            this.qrCodeProvider.shareQRCode(dataUrl);
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    canShowQRCode(): boolean {
        return this.qrCodeInput !== '' && this.qrCodeInput !== undefined;
    }

}
