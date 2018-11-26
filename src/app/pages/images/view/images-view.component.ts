import { Component, OnInit, HostListener } from '@angular/core';
// service
import { CategoryService } from '../../../service/category.service';
import { SubCategoryService } from '../../../service/subcategory.service';
import { ImageUploadService } from '../../../service/imageupload.service';
import { CryptorService } from '../../../service/cryptor.service';
import { SettingsService } from '../../../service/settings.service';
import { MessageService } from 'primeng/api';
// model
import { CategoryModel } from '../../../models/CategoryModel';
import { SubCategoryModel } from '../../../models/SubCategoryModel';
import { ImageModel } from '../../../models/ImageModel';
import { ImageViewModel } from '../../../models/ImageViewModel';
import { ImageList } from '../../../models/ImageList';
@Component({
  selector: 'app-impup',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.css']
})
export class ImagesViewComponent implements OnInit {
  category = [];
  selectedCategory: any;

  subCategory = [];
  selectedSubCategory: any;

  imageList = [];
  imageIndex = 0;
  finalImgSrc: any;

  dataloaded = false;

  imageHeight = 800;

  orgSize = false;

  useZoom = false;
  currPicId = 0;

  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public imageUploadService: ImageUploadService,
    public cryptorService: CryptorService,
    public settingsService: SettingsService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getCategorys();
    // this.getSubCategorys();
    this.imageIndex = 0;

    if (!this.orgSize) {
      this.imageHeight = window.innerHeight - 150;
    } else {
      this.setOrgSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (!this.orgSize) {
      this.imageHeight = window.innerHeight - 150;
    } else {
      this.setOrgSize();
    }
  }

  delImages() {
    // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Category added' });

    this.imageUploadService.deleteImage(    this.currPicId).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Image Deleted' });
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error  Message', detail: err });
      }
    );
  }

  valuechange(obj) {
    console.log('valuechange');
  }

  valuechangeCat(obj) {
    this.getCategorys();
  }

  getCategorys() {
    this.settingsService.fileNo = 0;
    this.settingsService.fileTot = 0;

    this.categoryService.getCategorys().subscribe(
      result => {
        const a = result;

        if (result) {
          if (result.length > 0) {
            this.category = [];
            result.forEach(element => {
              if (element) {
                const val = this.cryptorService.deCat(element.name);
                if (val) {
                  const x = new CategoryModel();
                  x.id = element.id;
                  x.name = val; // element.name;
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
    this.settingsService.fileTot = 0;
    this.subCategoryService.getSubCategorys(catid).subscribe(
      result => {
        if (result) {
          if (result.length > 0) {
            this.subCategory = [];
            result.forEach(element => {
              if (element) {
                const val = this.cryptorService.deCat(element.name);
                if (val) {
                  const x = new SubCategoryModel();
                  x.id = element.id;
                  x.name = val; // element.name;
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

  getImages() {
    this.settingsService.showInfo = false;
    this.imageIndex = 0;
    this.finalImgSrc = null;
    this.dataloaded = false;
    this.imageUploadService.getImages(this.selectedCategory.id, this.selectedSubCategory.id).subscribe(
      result => {
        const a = result;

        if (result) {
          if (result.length > 0) {
            this.dataloaded = true;
            this.imageList = [];
            result.forEach(element => {
              if (element) {
                const x = new ImageList();
                x.id = element.id;
                x.Name = element.name;
                x.Ext = element.ext;
                x.Size = element.size;
                this.imageList.push(x);
              }
            });
          }

          this.settingsService.fileTot = this.imageList.length;
        }
      },
      err => {
        this.dataloaded = false;
        const b = err;
      }
    );
  }

  nextImagesSpinner() {
    this.settingsService.showInfo = false;
    let x = 0;
    for (const obj of this.imageList) {
      if (x === this.imageIndex) {

        this.settingsService.imageSize = this.formatBytes(obj.Size, 3);
        this.settingsService.imageName = this.cryptorService.deC(obj.Name);


        this.getOneImage(obj.id);
        this.settingsService.fileNo = this.imageIndex;
        break;
      } else {
        x++;
      }
    }

    if (this.imageIndex >= this.imageList.length) {
      this.imageIndex = 0;
    }
    if (this.imageIndex < 0) {
      this.imageIndex = 0;
    }
  }

  nextImages() {
    this.settingsService.showInfo = false;
    let x = 0;
    for (const obj of this.imageList) {
      if (x === this.imageIndex) {

        this.settingsService.imageSize = this.formatBytes(obj.Size, 3);
        this.settingsService.imageName = this.cryptorService.deC(obj.Name);


        this.getOneImage(obj.id);
        this.imageIndex++;
        this.settingsService.fileNo = this.imageIndex;
        break;
      } else {
        x++;
      }
    }

    if (this.imageIndex >= this.imageList.length) {
      this.imageIndex = 0;
    }
    if (this.imageIndex < 0) {
      this.imageIndex = 0;
    }
  }

  prevImages() {
    this.settingsService.showInfo = false;
    let x = 0;
    this.imageIndex = this.imageIndex - 2;

    if (this.imageIndex >= this.imageList.length) {
      this.imageIndex = 0;
    }
    if (this.imageIndex < 0) {
      this.imageIndex = 0;
    }

    for (const obj of this.imageList) {
      if (x === this.imageIndex) {
        this.settingsService.imageSize = this.formatBytes(obj.Size, 3);
        this.settingsService.imageName = this.cryptorService.deC(obj.Name);
        this.getOneImage(obj.id);
        break;
      } else {
        x++;
      }
    }

    if (this.imageIndex >= this.imageList.length) {
      this.imageIndex = 0;
    }
    if (this.imageIndex < 0) {
      this.imageIndex = 0;
    }
  }

  getOneImage(id) {

    this.imageUploadService.getOneImage(id).subscribe(
      result => {
        if (result) {
          this.currPicId = result.id;
          const ret = this.cryptorService.deC(result.data);
          this.settingsService.showInfo = true;
          this.finalImgSrc = ret; // result.data;

          if (this.orgSize) {
            this.setOrgSize();
          }
        }
      },
      err => {
        this.currPicId = 0;
        const b = err;
      }
    );
  }

  setOrgSize() {
    const image = new Image();
    image.src = this.finalImgSrc;
    const x = this;
    image.onload = function () {
      x.imageHeight = image.height;
    };
  }

  imageSizeChange(obj) {
    if (!this.orgSize) {
      this.imageHeight = window.innerHeight - 150;
    } else {
      this.setOrgSize();
    }
  }

  useZoomChange(obj) {
    this.useZoom = obj.checked;
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

  formatBytes(a, b) {
    if (0 === a) {
      return '0 Bytes';
    }
    const c = 1024, d = b || 2, e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      f = Math.floor(Math.log(a) / Math.log(c)); return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];

  }
}

