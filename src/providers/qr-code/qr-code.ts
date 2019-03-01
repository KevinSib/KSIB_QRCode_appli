import { HttpClient } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { File } from '@ionic-native/file';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {

    static DEFAULT_TEMP_FILENAME: string = 'qrcode.svg';

    constructor(public http: HttpClient,
                private filePath: FilePath,
                private socialSharing: SocialSharing,
                private androidPermissions: AndroidPermissions,
                private file: File) {
        
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
        return new Promise((resolve, reject) => {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
                .then((result) => {
                    if (result.hasPermission === true) {
                        resolve(true);
                    } else {
                        throw new Error('No permission');
                    }
                })
                .catch((err) => {
                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
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

}
