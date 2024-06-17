import { ElementConfig } from '../shared/models/element.config';

export interface AppState {
  elements: ElementConfig[];
  connections: { sourceId: string, targetId: string }[];
};

export const initialState: AppState = {
  elements: [],
  connections: []
};
