import { createReducer, on, Action } from '@ngrx/store';
import { loadItems, loadItemsSuccess, loadItemsFailure } from '../actions/app.actions';

export interface AppState {
  items: any[];
  error: any;
}

export const initialState: AppState = {
  items: [],
  error: null
};

const _appReducer = createReducer(
  initialState,
  on(loadItems, state => ({ ...state })),
  on(loadItemsSuccess, (state, { items }) => ({ ...state, items })),
  on(loadItemsFailure, (state, { error }) => ({ ...state, error }))
);

export function appReducer(state: AppState | undefined, action: Action) {
  return _appReducer(state, action);
}
