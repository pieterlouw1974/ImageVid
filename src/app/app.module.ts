import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AdunitService } from './service/adunit.service';
// import { CategoryService } from './service/category.service';
// import { SubCategoryService } from './service/subcategory.service';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
// prime
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion'; // accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BlockUIModule } from 'primeng/blockui';
import { MenuModule } from 'primeng/menu';
import {ToolbarModule} from 'primeng/toolbar';
import {SpinnerModule} from 'primeng/spinner';


import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { IndexComponent } from './components/index/index.component';
import { EditComponent } from './components/edit/edit.component';

import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.componet';
import { ImagesUploadComponent } from './pages/images/upload/images-upload.component';
import { CategoriesComponent } from './pages/setup/categories/setup-categories.component';
import { ImagesViewComponent } from './pages/images/view/images-view.component';
import { VideoUploadComponent } from './pages/video/upload/video-upload.component';
import { VideoPlayComponent } from './pages/video/play/video-play.component';

import { CategoryService } from './service/category.service';
import { SubCategoryService } from './service/subcategory.service';
import { ImageUploadService } from './service/imageupload.service';
import { CryptorService } from './service/cryptor.service';
import { SettingsService } from './service/settings.service';
import { VideoService } from './service/video.service';

import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    IndexComponent,
    EditComponent,
    MainComponent,
    MenuComponent,
    ImagesUploadComponent,
    CategoriesComponent,
    ImagesViewComponent,
    VideoUploadComponent,
    VideoPlayComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes),
    routing,
    BrowserAnimationsModule,
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // prime
    FileUploadModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ProgressBarModule,
    InputSwitchModule,
    OverlayPanelModule,
    BlockUIModule,
    ToolbarModule,
    MenuModule,
    SpinnerModule,
    // material
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxImageZoomModule.forRoot() // <-- Add this line
  ],
  providers: [MessageService, CategoryService, SubCategoryService, ImageUploadService, CryptorService, SettingsService, VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
