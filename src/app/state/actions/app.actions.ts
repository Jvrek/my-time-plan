import { createAction, props } from '@ngrx/store';

export const loadItems = createAction('[App] Load Items');
export const loadItemsSuccess = createAction('[App] Load Items Success', props<{ items: any[] }>());
export const loadItemsFailure = createAction('[App] Load Items Failure', props<{ error: any }>());
