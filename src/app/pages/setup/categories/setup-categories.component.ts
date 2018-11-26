import { Component, OnInit } from '@angular/core';
// service
import { CategoryService } from '../../../service/category.service';
import { SubCategoryService } from '../../../service/subcategory.service';
import { CryptorService } from '../../../service/cryptor.service';
import { MessageService } from 'primeng/api';
import { SettingsService } from '../../../service/settings.service';
// model
import { CategoryModel } from '../../../models/CategoryModel';
import { SubCategoryModel } from '../../../models/SubCategoryModel';

@Component({
  selector: 'app-impup',
  templateUrl: './setup-categories.component.html',
  styleUrls: ['./setup-categories.component.css']
})
export class CategoriesComponent implements OnInit {
  category = [];
  selectedCategory: CategoryModel;
  categoryText: string;

  subCategory = [];
  selectedSubCategory: any;
  subCategoryText: string;



  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public cryptorService: CryptorService,
    private messageService: MessageService,
    public settingsService: SettingsService) { }

  ngOnInit() {
    this.getCategorys();
    // this.getSubCategorys();
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
                const x = new CategoryModel();
                x.id = element.id;
                x.name = this.cryptorService.deCat(element.name); // element.name;
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

  addCat() {
    const cat = new CategoryModel();
    cat.name = this.cryptorService.enCat(this.categoryText);

    this.categoryService.insertCategory(cat).subscribe(
      result => {
        const a = result;
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Category added' });
        this.getCategorys();
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error  Message', detail: 'Category NOT added' });
        const b = err;
      }
    );
  }

  getSubCategorys(catid: number) {
    this.subCategoryService.getSubCategorys(catid).subscribe(
      result => {
        if (result) {
          if (result.length > 0) {
            this.subCategory = [];
            result.forEach(element => {
              if (element) {
                const x = new SubCategoryModel();
                x.id = element.id;
                x.name = this.cryptorService.deCat(element.name);
                if (x.name.length > 0) {
                  this.subCategory.push(x);
                }
              }
            });

            const a = this.subCategory.slice(0);
            a.sort(this.alphabetical);
            this.subCategory = a;
          }
        }
      },
      err => {
        const b = err;
      }
    );
  }

  addSubCat() {
    const subCat = new SubCategoryModel();
    subCat.name = this.cryptorService.enCat(this.subCategoryText);
    subCat.catid = this.selectedCategory.id;

    this.subCategoryService.insertSubCategory(subCat).subscribe(
      result => {
        const a = result;
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sub Category added' });
        this.getSubCategorys(subCat.catid);
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error  Message', detail: 'Sub Category NOT added' });
        const b = err;
      }
    );
  }

  valuechangeCat(obj) {
    console.log('valuechangeCat');

    this.getCategorys();
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
