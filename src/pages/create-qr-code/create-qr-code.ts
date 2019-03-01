import { QrCodeProvider } from './../../providers/qr-code/qr-code';
import { BasePage } from './../base-page.page';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRCodeComponent } from 'angularx-qrcode';

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
        const svgData = this.qrCodeRender.el.nativeElement.children[0].outerHTML;
        const preface = '<?xml version="1.0" standalone="no"?>\r\n';
        const svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
        this.qrCodeProvider.shareQRCode(svgBlob);
    }

    canShowQRCode(): boolean {
        return this.qrCodeInput !== '' && this.qrCodeInput !== undefined;
    }

}
