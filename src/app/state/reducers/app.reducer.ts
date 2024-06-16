import { Action, createReducer, on } from '@ngrx/store';
import { addElement, updateElement, deleteElement, loadElementsSuccess } from '../actions/app.actions';
import { AppState, initialState } from '../app.state';

const _appReducer = createReducer(
  initialState,
  on(addElement, (state, { element }) => ({
    ...state,
    elements: [...state.elements, element]
  })),
  on(updateElement, (state, { element }) => ({
    ...state,
    elements: state.elements.map(el => el.type === element.type ? element : el)
  })),
  on(deleteElement, (state, { elementId }) => ({
    ...state,
    elements: state.elements.filter((el, index) => index !== elementId)
  })),
  on(loadElementsSuccess, (state, { elements }) => ({
    ...state,
    elements
  }))
);

export function appReducer(state: AppState | undefined, action: Action) {
  return _appReducer(state, action);
}
