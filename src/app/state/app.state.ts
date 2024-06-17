import { Element } from '../shared/models/element.config';

export interface AppState {
  elements: Element[];
  connections: { sourceId: string, targetId: string }[];
};

export const initialState: AppState = {
  elements: [],
  connections: []
};
