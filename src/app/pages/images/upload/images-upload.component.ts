import { Component, OnInit } from '@angular/core';
// service
import { CategoryService } from '../../../service/category.service';
import { SubCategoryService } from '../../../service/subcategory.service';
import { ImageUploadService } from '../../../service/imageupload.service';
import { CryptorService } from '../../../service/cryptor.service';
import { MessageService } from 'primeng/api';
import { SettingsService } from '../../../service/settings.service';
// model
import { CategoryModel } from '../../../models/CategoryModel';
import { SubCategoryModel } from '../../../models/SubCategoryModel';
import { ImageModel } from '../../../models/ImageModel';

@Component({
  selector: 'app-impup',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.css']
})
export class ImagesUploadComponent implements OnInit {
  uploadedFiles: any[] = [];

  category = [];
  selectedCategory: any;

  subCategory = [];
  selectedSubCategory: any;

  pictureItems = [];
  base64textString = '';
  fileToUpload;

  completeValue = 0;
  sendValue = 0;

  uploadCnt = 0;
  upPresent = 0;
  sendValueOk = 0;
  sendValueFail = 0;

  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public imageUploadService: ImageUploadService,
    public cryptorService: CryptorService,
    private messageService: MessageService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    console.log('ngOnInit');

    this.getCategorys();
    // this.getSubCategorys();
  }

  valuechange(obj) {
    console.log('valuechange');
  }

  valuechangeCat(obj) {
    console.log('valuechangeCat');

    this.getCategorys();
  }

  getCategorys() {
    console.log('getCategorys');

    this.categoryService.getCategorys().subscribe(
      result => {
        const a = result;

        if (result) {
          if (result.length > 0) {
            this.category = [];
            result.forEach(element => {
              if (element) {
                const x = new CategoryModel();
                x.id = element.id;
                x.name = this.cryptorService.deCat(element.name);
                if (x.name.length > 0) {
                  this.category.push(x);
                }
              }
            });
          }
        }
      },
      err => {
        const b = err;
      }
    );
  }

  getSubCategorys(catid: number) {
    console.log('getSubCategorys');

    this.subCategoryService.getSubCategorys(catid).subscribe(
      result => {
        if (result) {
          if (result.length > 0) {
            this.subCategory = [];
            result.forEach(element => {
              if (element) {
                const x = new SubCategoryModel();
                x.id = element.id;
                x.name = this.cryptorService.deCat(element.name); // element.name;
                if (x.name.length > 0) {
                  this.subCategory.push(x);
                }
              }
            });

            const a = this.subCategory.slice(0);
            a.sort(this.alphabetical);
            this.subCategory = a;

          } else {
            this.subCategory = [];
          }
        }
      },
      err => {
        const b = err;
      }
    );
  }

  select(event) {
    console.log('select');

    this.base64textString = '';
    for (const file of event.files) {
      if (file) {
        this.fileToUpload = file;

        const reader = new FileReader();

        const arg = [];
        arg.push({ name: this.fileToUpload.name, type: this.fileToUpload.type, size: this.fileToUpload.size });

        reader.onload = this.handleReaderLoaded.bind(this, arg);
        reader.readAsBinaryString(this.fileToUpload);
        this.uploadedFiles.push(this.fileToUpload);
      }
    }
  }

  onUpload(event) {
    console.log('onUpload');

    this.completeValue = 0;
    this.sendValue = 0;

    if (this.selectedCategory.id && this.selectedSubCategory.id) {
      if (this.pictureItems) {
        this.upPresent = 100 / this.pictureItems.length;

        if (this.settingsService.pwInput.length > 0) {
          this.pictureItems.forEach(element => {

            this.sendValue = this.sendValue + 1;

            const encData = this.cryptorService.enC(element.data);

            const x = new ImageModel();
            x.name = this.cryptorService.enC(element.name);
            x.ext = element.ext;
            x.catId = this.selectedCategory.id;
            x.subCatId = this.selectedSubCategory.id;
            x.data = encData;
            x.id = 0;
            x.size = element.size;
            // upload to db
            this.imageUploadService.insertImage(x).subscribe(
              result => {
                this.sendValueOk = this.sendValueOk + 1;
                if (this.uploadCnt === 0) { this.uploadCnt = 1; }
                this.completeValue = Math.round(this.uploadCnt * this.upPresent);
                this.uploadCnt = this.uploadCnt + 1;

              },
              err => {
                this.sendValueFail = this.sendValueFail + 1;
                this.completeValue = Math.round(this.uploadCnt * this.upPresent);
                this.uploadCnt = this.uploadCnt + 1;
                this.messageService.add({ severity: 'error', summary: 'Error  Message', detail: err });
              }
            );
          });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warn  Message', detail: 'Give a Password' });
        }
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Warn  Message', detail: 'No Pictures selected' });
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn  Message', detail: 'No Cat or Subcat' });
    }
  }

  private handleReaderLoaded(arg, readerEvt) {
    console.log('handleReaderLoaded');

    let type = 'image/jpeg';
    let name = 'Unknown';
    let size = 0;

    if (arg[0]) {
      const argAr = arg[0];
      name = argAr.name;
      type = argAr.type;
      size = argAr.size;
    }

    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    const fileImage = 'data:' + type + ';base64,' + this.base64textString;

    const x = new ImageModel();
    x.name = name;
    x.ext = type;
    x.size = size;
    x.data = fileImage;

    this.pictureItems.push(x);
  }

  clearRepotsUpload() {
    console.log('clearRepotsUpload');

    this.completeValue = 0;
    this.sendValue = 0;
    this.upPresent = 0;
    this.sendValueOk = 0;
    this.sendValueFail = 0;
    this.uploadCnt = 0;
    this.uploadedFiles = [];
    this.pictureItems = [];
  }

  catChange(obj) {
    console.log('catChange');

    const catid = obj.value.id;
    this.getSubCategorys(catid);
  }

  alphabetical(a, b) {
    if (a.name && b.name) {
      const A = a.name.toLowerCase();
      const B = b.name.toLowerCase();
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}
