import { ElementConfig } from '../shared/models/element.config';

export interface AppState {
  elements: ElementConfig[];
}

export const initialState: AppState = {
  elements: []
};
