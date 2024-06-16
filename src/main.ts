import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { appReducer } from './app/state/reducers/app.reducer';
import { AppEffects } from './app/state//effects/app.effects';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideStore({ app: appReducer }),
    provideEffects([AppEffects]),
  ]
}).catch(err => console.error(err));
