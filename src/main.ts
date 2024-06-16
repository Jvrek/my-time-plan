import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { appReducer } from './app/state/reducers/app.reducer';
import { AppEffects } from './app/state//effects/app.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ app: appReducer }),
    provideEffects([AppEffects]),
  ]
}).catch(err => console.error(err));
