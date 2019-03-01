import { AlertController } from "ionic-angular";

export class BasePage {

    constructor(public alertCtrl: AlertController) { }

    public pageTitle: string;

    protected showMessage(title: string, message: string): void {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    }

}