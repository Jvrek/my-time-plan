import { createAction, props } from '@ngrx/store';
import { ElementConfig } from '../../shared/models/element.config';

export const addElement = createAction('[App] Add Element', props<{ element: ElementConfig }>());
export const updateElement = createAction('[App] Update Element', props<{ element: ElementConfig }>());
export const deleteElement = createAction('[App] Delete Element', props<{ elementId: number }>());
export const loadElements = createAction('[App] Load Elements');
export const loadElementsSuccess = createAction('[App] Load Elements Success', props<{ elements: ElementConfig[] }>());
