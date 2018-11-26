// angular
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import {SettingsService} from './settings.service';
@Injectable()
export class CryptorService {
  private encrypted: any;
  private decrypted: any;

  constructor(private settingsService: SettingsService) {
  }

  enC(str: string) {
    let ret = '';

    if (this.settingsService.pwInput.length > 0) {
      this.encrypted = CryptoJS.AES.encrypt(str, this.settingsService.pwInput);
      ret = this.encrypted.toString();
    }
     return ret;
  }

  deC(str: string) {

    if (this.settingsService.pwInput.length > 0) {
      try {
        this.decrypted = CryptoJS.AES.decrypt(str, this.settingsService.pwInput).toString(CryptoJS.enc.Utf8);
      } catch (error) {
        this.decrypted = '';
      }
    } else {
      this.decrypted = str;
    }
     return this.decrypted;
  }

  enCat(str: string) {
    let ret = '';

    if (this.settingsService.pwInputCat.length > 0) {
      this.encrypted = CryptoJS.AES.encrypt(str, this.settingsService.pwInputCat);
      ret = this.encrypted.toString();
    } else {
      ret = null;
    }
    return ret;
  }

  deCat(str: string) {

    let decryptedCat = '';
    if (this.settingsService.pwInputCat.length > 0) {
      try {
        decryptedCat = CryptoJS.AES.decrypt(str, this.settingsService.pwInputCat).toString(CryptoJS.enc.Utf8);
      } catch (error) {
        decryptedCat = '';
      }
    } else {
      decryptedCat = null;
    }
     return decryptedCat;
  }
}
