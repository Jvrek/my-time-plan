import { Action, createReducer, on } from '@ngrx/store';
import { addElement, updateElement, deleteElement, loadElementsSuccess, addConnection, deleteConnection } from '../actions/app.actions';
import { AppState, initialState } from '../app.state';

const _appReducer = createReducer(
  initialState,
  on(addElement, (state, { element }) => ({
    ...state,
    elements: [...state.elements, element]
  })),
  on(updateElement, (state, { element }) => ({
    ...state,
    elements: state.elements.map(el => el.id === element.id ? element : el)
  })),
  on(deleteElement, (state, { elementId }) => ({
    ...state,
    elements: state.elements.filter((el, index) => index !== elementId),
    connections: state.connections.filter(conn => conn.sourceId !== state.elements[elementId].id && conn.targetId !== state.elements[elementId].id)
  })),
  on(loadElementsSuccess, (state, { elements }) => ({
    ...state,
    elements
  })),
  on(addConnection, (state, { sourceId, targetId }) => ({
    ...state,
    connections: [...state.connections, { sourceId, targetId }]
  })),
  on(deleteConnection, (state, { sourceId, targetId }) => ({
    ...state,
    connections: state.connections.filter(conn => conn.sourceId !== sourceId || conn.targetId !== targetId)
  }))
);

export function appReducer(state: AppState | undefined, action: Action) {
  return _appReducer(state, action);
}
