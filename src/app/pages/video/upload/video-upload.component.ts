import { Component, OnInit, ViewChild } from '@angular/core';

import { SettingsService } from '../../../service/settings.service';
import { VideoService } from '../../../service/video.service';
import { SubCategoryService } from '../../../service/subcategory.service';
import { CryptorService } from '../../../service/cryptor.service';
import { CategoryService } from '../../../service/category.service';

import { CategoryModel } from '../../../models/CategoryModel';
import { SubCategoryModel } from '../../../models/SubCategoryModel';
import { CatSubCatVideoModel } from '../../../models/CatSubCatVideoModel';

@Component({
  selector: 'app-vidup',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  category = [];
  selectedCategory: CategoryModel;

  subCategory = [];
  selectedSubCategory: SubCategoryModel;

  sendValue = 'Waiting';
  uploadFileName = '';

  constructor(
    public videoService: VideoService,
    public settingsService: SettingsService,
    public subCategoryService: SubCategoryService,
    public cryptorService: CryptorService,
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
    console.log('ngOnInit');

    this.getCategorys();
  }

  addFile(): void {
    this.sendValue = 'Saving';

    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];

      this.uploadFileName = fileToUpload.name;

      this.videoService
        .upload(fileToUpload)
        .subscribe(res => {
          this.sendValue = 'Completed';
          console.log(res);
          this.updateAddFile();
        });
    }
  }

  updateAddFile(): void {
    this.sendValue = 'Update';

    const catSubCatVideo = new CatSubCatVideoModel();
    catSubCatVideo.filename = this.uploadFileName;
    catSubCatVideo.catid = this.selectedCategory.id;
    catSubCatVideo.subcatid = this.selectedSubCategory.id;

    this.videoService
      .uploadCatSubcat(catSubCatVideo)
      .subscribe(res => {
        this.sendValue = 'Completed';
        console.log(res);
      });
  }

  valuechange(obj) {
    console.log('valuechange');
  }

  valuechangeCat(obj) {
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

  catChange(obj) {
    console.log('catChange');

    const catid = obj.value.id;
    this.getSubCategorys(catid);
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
