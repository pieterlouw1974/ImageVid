// angular
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  public pwInput = '';
  public pwInputCat = '';

  showInfo = false;
  imageName = '';
  imageSize = '';

  fileTot = 0;
  fileNo = 0;
  constructor() {}

}
