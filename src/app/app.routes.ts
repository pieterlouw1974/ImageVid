import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { IndexComponent } from './components/index/index.component';
import { EditComponent } from './components/edit/edit.component';

import { MainComponent } from './pages/main/main.component';
import { ImagesUploadComponent } from './pages/images/upload/images-upload.component';
import { CategoriesComponent } from './pages/setup/categories/setup-categories.component';
import { ImagesViewComponent } from './pages/images/view/images-view.component';
import { VideoUploadComponent } from './pages/video/upload/video-upload.component';
import { VideoPlayComponent } from './pages/video/play/video-play.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'uploadimages',
    component: ImagesUploadComponent
  },
  {
    path: 'uploadvid',
    component: VideoUploadComponent
  },
  {
    path: 'playvid',
    component: VideoPlayComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'view',
    component: ImagesViewComponent
  }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
