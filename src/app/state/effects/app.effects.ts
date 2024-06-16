import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppService } from '../../services/app.service';
import { loadElements, loadElementsSuccess } from '../actions/app.actions';

@Injectable()
export class AppEffects {

  loadElements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadElements),
      mergeMap(() => this.appService.getAll()
        .pipe(
          map(elements => loadElementsSuccess({ elements })),
          catchError(() => of({ type: '[App] Load Elements Failed' }))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) { }
}
