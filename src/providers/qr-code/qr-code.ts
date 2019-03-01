import { ScannerError } from './../../models/scanner.error.enum';
import { HttpClient } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { File } from '@ionic-native/file';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import jsQR from "jsqr";
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Base64 } from '@ionic-native/base64';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {

    static DEFAULT_TEMP_FILENAME: string = 'qrcode.png';

    constructor(public http: HttpClient,
                private filePath: FilePath,
                private socialSharing: SocialSharing,
                private androidPermissions: AndroidPermissions,
                private file: File,
                private barcodeScanner: BarcodeScanner,
                private fileChooser: FileChooser,
                private camera: Camera,
                private base64: Base64) {
        
    }

    generate(text: string): Promise<string> {
        return Promise.resolve(text);
    }

    shareQRCode(blob: Blob): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getWritePermission()
                .then((permissionResult) => {
                    if (permissionResult) {
                        this.createTmpFile(blob, QrCodeProvider.DEFAULT_TEMP_FILENAME)
                            .then((res) => {
                                console.log('res', res)
                                this.socialSharing.share('', '', res);
                            })
                            .catch((error) => {
                                console.log('err', error)
                            });
                    } else {
                        resolve(false);
                    }
                });
        });
    }

    getWritePermission(): Promise<boolean> {
        return this.getPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
    }

    getReadPermission(): Promise<boolean> {
        return this.getPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
    }

    getPermission(permission: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.androidPermissions.checkPermission(permission)
                .then((result) => {
                    if (result.hasPermission === true) {
                        resolve(true);
                    } else {
                        throw new Error('No permission');
                    }
                })
                .catch((err) => {
                    this.androidPermissions.requestPermission(permission)
                        .then((res) => {
                            resolve(true);
                        })
                        .catch((errr) => {
                            resolve(false);
                        });
                });
        });
    }

    createTmpFile(content: string | Blob, filename: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.file.createFile(this.getDataDirectory(), filename, true)
                .then(() => {
                    this.file.writeExistingFile(this.getDataDirectory(), filename, content)
                        .then(async (res) => {
                            const path = await this.resolvePath(this.getDataDirectory() + '/' + filename);
                            resolve(path);
                        })
                        .catch((err) => {
                            console.log('writeExistingFile error', err);
                            reject();
                        });
                })
                .catch((err) => {
                    console.log('createFile error', err);
                    reject();
                });
        });
    }

    getDataDirectory(): string {
        return this.file.cacheDirectory;
    }

    resolvePath(path: string): Promise<string> {
        return this.filePath.resolveNativePath(path);
    }

    scanQRCode(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.barcodeScanner.scan()
            .then(barcodeData => {
                if (barcodeData.cancelled) {
                    reject(ScannerError.CANCELED);
                } else {
                    resolve(barcodeData.text);
                }
            })
            .catch(err => {
                console.log('Error', err);
                reject(ScannerError.UNKNOW);
            });
        });
    }

    scanQRCodeFromFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.fileChooser.open()
            .then((uri) => {
                this.getReadPermission()
                    .then(async (res) => {
                        const resolvedFilePath: string = await this.filePath.resolveNativePath(uri);
                        this.base64.encodeFile(resolvedFilePath).then((base64File: string) => {
                            this.jsqrConversion(base64File)
                            .then(r => {
                                console.log(r);
                                resolve(r);
                            })
                            .catch(f => {
                                console.log(f);
                                reject(f);
                            });
                          }, (err) => {
                            console.log(err);
                          });
                    })
                    .catch((err) => {
                        reject('permission denied');
                    });
            })
            .catch(e => {
                reject(e);
            });
        });
    }

    private async jsqrConversion(content: string): Promise<string> {

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
          
        return await new Promise<string>((resolve, reject) => {

            const pic = new Image();
            pic.src = content;

            pic.onload = () => {

                canvas.width = pic.width;
                canvas.height = pic.height;
                context.drawImage(pic, 0, 0);

                const image = context.getImageData(0, 0, canvas.width, canvas.height);
                const result = jsQR(image.data, image.width, image.height);

                if (!result) {
                    reject('No qrcode');
                } else {
                    resolve(result.data);
                }
      
            };

            pic.onerror = (err) => {
                console.log('load failed', err);
                reject('Load failed');
            }

        });

    }

}
