import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Wd0FiWHpecHJURWdV');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
