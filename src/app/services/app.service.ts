import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ELEMENT_CONFIGS, Element } from '../shared/models/element.config';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private elements: Element[] = ELEMENT_CONFIGS;

  getAll() {
    return of(this.elements);
  }

}
