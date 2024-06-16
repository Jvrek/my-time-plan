import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ELEMENT_CONFIGS, ElementConfig } from '../shared/models/element.config';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private elements: ElementConfig[] = ELEMENT_CONFIGS;

  getAll() {
    return of(this.elements);
  }

}
