import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { SettingsService } from './service/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mode = new FormControl('side');
  items: MenuItem[];
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, public settingsService: SettingsService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });

    this.items = [{
      label: 'Category',
      items: [
        { label: 'Setup', icon: 'pi pi-sitemap', routerLink: ['/categories'] }
      ]
    },
    {
      label: 'Image',
      items: [
        { label: 'Add', icon: 'pi pi-plus', routerLink: ['/uploadimages'] },
        { label: 'View', icon: 'pi pi-eye', routerLink: ['/view'] }
      ]
    },
    {
      label: 'Video',
      items: [
        { label: 'Add', icon: 'pi pi-plus ', routerLink: ['/uploadvid'] },
        { label: 'Play', icon: 'pi pi-video', routerLink: ['/playvid'] }
      ]
    }];
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}
