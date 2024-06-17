import { Action, createReducer, on } from '@ngrx/store';
import { addElement, updateElement, deleteElement, loadElementsSuccess, addConnection, deleteConnection, deleteConnectionsByElement } from '../actions/app.actions';
import { AppState, initialState } from '../app.state';

const _appReducer = createReducer(
  initialState,
  on(loadElementsSuccess, (state, { elements }) => ({
    ...state,
    elements
  })),
  on(addElement, (state, { element }) => {
    const newElement = { ...element, id: generateId() };
    return {
      ...state,
      elements: [...state.elements, newElement]
    };
  }),
  on(updateElement, (state, { element }) => ({
    ...state,
    elements: state.elements.map(el => el.id === element.id ? element : el)
  })),
  on(deleteElement, (state, { elementId }) => ({
    ...state,
    elements: state.elements.filter(el => el.id !== elementId)
  })),
  on(addConnection, (state, { sourceId, targetId }) => ({
    ...state,
    connections: [...state.connections, { sourceId, targetId }]
  })),
  on(deleteConnection, (state, { sourceId, targetId }) => ({
    ...state,
    connections: state.connections.filter(conn => conn.sourceId !== sourceId || conn.targetId !== targetId)
  })),
  on(deleteConnectionsByElement, (state, { elementId }) => ({
    ...state,
    connections: state.connections.filter(conn => conn.sourceId !== elementId && conn.targetId !== elementId)
  })),
);

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function appReducer(state: AppState | undefined, action: Action) {
  return _appReducer(state, action);
}
