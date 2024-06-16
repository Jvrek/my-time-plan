import { Component, OnInit } from '@angular/core';
import { ElementComponent } from './shared/components/element/element.component';
import { ElementConfig } from './shared/models/element.config';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addElement, loadElements } from './state/actions/app.actions';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ElementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  elements$ = this.store.select(state => state.app.elements);

  constructor(private store: Store<{ app: AppState }>) { }

  ngOnInit() {
    this.store.dispatch(loadElements());
    this.elements$.subscribe(elements => {
      console.log('Elements in store:', elements);
      if (!Array.isArray(elements)) {
        console.error('Elements is not an array:', elements);
      }
    });
  }

  addElement(type: 'type1' | 'type2' | 'type3') {
    const newElement: ElementConfig = {
      type,
      name: '',
      inputs: type === 'type1' ? ['', ''] : ['']
    };
    console.log('Dispatching addElement action:', newElement);
    this.store.dispatch(addElement({ element: newElement }));
  }
}
