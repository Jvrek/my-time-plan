import { createAction, props } from '@ngrx/store';
import { Element } from '../../shared/models/element.config';

export const addElement = createAction('[App] Add Element', props<{ element: Element }>());
export const updateElement = createAction('[App] Update Element', props<{ element: Element }>());
export const deleteElement = createAction('[App] Delete Element', props<{ elementId: string }>());
export const loadElements = createAction('[App] Load Elements');
export const loadElementsSuccess = createAction('[App] Load Elements Success', props<{ elements: Element[] }>());
export const addConnection = createAction('[App] Add Connection', props<{ sourceId: string, targetId: string }>());
export const deleteConnection = createAction('[App] Delete Connection', props<{ sourceId: string, targetId: string }>());
export const deleteConnectionsByElement = createAction('[App] Delete Connections By Element', props<{ elementId: string }>());
