import { createAction, props } from '@ngrx/store';
import { ElementConfig } from '../../shared/models/element.config';

export const addElement = createAction('[App] Add Element', props<{ element: ElementConfig }>());
export const updateElement = createAction('[App] Update Element', props<{ element: ElementConfig }>());
export const deleteElement = createAction('[App] Delete Element', props<{ elementId: string }>());
export const loadElements = createAction('[App] Load Elements');
export const loadElementsSuccess = createAction('[App] Load Elements Success', props<{ elements: ElementConfig[] }>());
export const addConnection = createAction('[App] Add Connection', props<{ sourceId: string, targetId: string }>());
export const deleteConnection = createAction('[App] Delete Connection', props<{ sourceId: string, targetId: string }>());
export const deleteConnectionsByElement = createAction('[App] Delete Connections By Element', props<{ elementId: string }>());
