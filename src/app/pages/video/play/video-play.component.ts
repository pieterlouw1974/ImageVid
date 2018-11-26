import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { SettingsService } from '../../../service/settings.service';
import { VideoService } from '../../../service/video.service';
import { SubCategoryService } from '../../../service/subcategory.service';
import { CryptorService } from '../../../service/cryptor.service';
import { CategoryService } from '../../../service/category.service';
import { MessageService } from 'primeng/api';

import { CategoryModel } from '../../../models/CategoryModel';
import { SubCategoryModel } from '../../../models/SubCategoryModel';
import { CatSubCatVideoModel } from '../../../models/CatSubCatVideoModel';
import { VideoList } from '../../../models/VideoListModel';

@Component({
  selector: 'app-vidup',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.css']
})
export class VideoPlayComponent implements OnInit {
  category = [];
  selectedCategory: any;

  subCategory = [];
  selectedSubCategory: any;

  dataloaded = false;
  vidListloaded = false;

  videoList = [];
  selectedVideo: any;

  showVid = false;
  vidUrl: SafeResourceUrl;
  actionUrl = 'http://localhost:5000/api/Video';
  vidType = 'video/mp4';

  vidHeight = 800;

  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public videoService: VideoService,
    public cryptorService: CryptorService,
    public settingsService: SettingsService,
    public messageService: MessageService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    this.getCategorys();
    this.vidHeight = window.innerHeight - 150;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.vidHeight = window.innerHeight - 150;
  }

  delVideo() {
    // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Category added' });

    this.videoService.deleteVideo(this.selectedVideo.id).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Video Deleted' });
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error  Message', detail: err });
      }
    );
  }


  getCategorys() {
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

  valuechange(obj) {
    console.log('valuechange');
  }

  valuechangeCat(obj) {
    this.getCategorys();
  }

  getVideos() {
    this.settingsService.showInfo = false;

    this.videoService.getVideoList(this.selectedCategory.id, this.selectedSubCategory.id).subscribe(
      result => {
        const a = result;

        if (result) {
          if (result.length > 0) {
            this.dataloaded = true;
            this.videoList = [];
            result.forEach(element => {
              if (element) {
                const x = new VideoList();
                x.id = element.id;
                x.fileName = element.fileName;
                x.contenttype = element.contenttype;

                this.videoList.push(x);
              }
            });

            if (this.videoList.length > 0) {
              this.vidListloaded = true;
            } else {
              this.vidListloaded = false;
              this.messageService.add({ severity: 'info', summary: 'Info  Message', detail: 'No Videos Found' });
            }

          }
        }
      },
      err => {
        this.dataloaded = false;
        const b = err;
      }
    );
  }

  getSelectedVideo(obj) {
    this.showVid = false;
    this.vidUrl = '';

    this.getOneVideo(this.selectedVideo.id);
  }

  getOneVideo(id) {
    this.vidType = this.selectedVideo.contenttype;
    this.vidUrl = this.actionUrl + '/' + id;
    // this.vidUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.actionUrl + '/' + id);
    this.showVid = true;
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();

    // this.videoService.getOneVideo(id).subscribe(
    //   result => {
    //     if (result) {




    //     }
    //   },
    //   err => {
    //     this.messageService.add({ severity: 'error', summary: 'Error  Message', detail: err });
    //   }
    // );
  }

  catChange(obj) {
    console.log('catChange');

    const catid = obj.value.id;
    this.getSubCategorys(catid);
  }

  getSubCategorys(catid: number) {
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
