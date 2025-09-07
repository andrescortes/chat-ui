import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from '@angular/router';
import { provideToastr } from "ngx-toastr";

import { routes } from './app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true
    })
  ]
};
