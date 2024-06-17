import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ElementComponent } from './shared/components/element/element.component';
import { JsPlumbDirective } from './shared/directives/jsplumb.directive';
import { AppState } from './state/app.state';
import { addElement, loadElements, deleteElement, addConnection, deleteConnectionsByElement, updateElement } from './state/actions/app.actions';
import { Element } from './shared/models/element.config';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ElementComponent, JsPlumbDirective, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: true }) container: ElementRef | null = null;
  containerElement: HTMLElement | null = null;
  elements$ = this.store.select(state => state.app.elements);
  connections$ = this.store.select(state => state.app.connections);
  private sourceElement: HTMLElement | null = null;

  connections: { sourceId: string, targetId: string }[] = [];

  constructor(private store: Store<{ app: AppState }>) { }

  ngOnInit() {
    this.store.dispatch(loadElements());
    this.elements$.subscribe(elements => {
      console.log('Elements in store:', elements);
      if (!Array.isArray(elements)) {
        console.error('Elements is not an array:', elements);
      }
    });
    this.connections$.subscribe(connections => {
      console.log('Connections in store:', connections);
      this.connections = connections;
    });
  }

  ngAfterViewInit() {
    this.containerElement = this.container ? this.container.nativeElement : null;
    if (!this.containerElement) {
      console.error("Container element not found");
    }
  }

  addElement(type: 'type1' | 'type2' | 'type3') {
    const newElement: Element = {
      id: this.generateId(),
      type,
      name: '',
      inputs: type === 'type1' ? ['', ''] : ['']
    };
    console.log('Dispatching addElement action:', newElement);
    this.store.dispatch(addElement({ element: newElement }));
  }

  removeElement(elementId: string) {
    this.store.dispatch(deleteElement({ elementId }));
    this.store.dispatch(deleteConnectionsByElement({ elementId }));
  }

  handleStartConnection(element: HTMLElement) {
    const elementId = this.getElementId(element);
    if (!elementId) {
      console.error('Element ID not found for element:', element);
      return;
    }

    if (!this.sourceElement) {
      this.sourceElement = element;
      console.log('Source element selected:', elementId);
    } else {
      const sourceId = this.getElementId(this.sourceElement);
      const targetId = elementId;

      if (sourceId && targetId && this.canConnect(sourceId, targetId)) {
        if (!this.isConnectionExist(sourceId, targetId)) {
          this.store.dispatch(addConnection({ sourceId, targetId }));
          console.log('Connection added between:', sourceId, targetId);
        } else {
          console.log('Connection already exists between:', sourceId, targetId);
        }
        this.sourceElement = null;
      } else {
        console.error('Cannot connect these elements');
        this.sourceElement = null;
      }
    }
  }

  updateElement({ id, key, value }: { id: string, key: string, value: any }) {
    const element = this.getElementConfigById(id);
    if (element) {
      const updatedElement = { ...element, [key]: value };
      this.store.dispatch(updateElement({ element: updatedElement }));
    }
  }

  trackById(index: number, element: Element): string {
    return element.id;
  }

  private canConnect(sourceId: string, targetId: string): boolean {
    const source = this.getElementConfigById(sourceId);
    const target = this.getElementConfigById(targetId);
    if (source && target) {
      console.log('Source:', source, 'Target:', target);
      return source.type !== target.type; // example rule: cannot connect same type
    }
    return false;
  }

  private isConnectionExist(sourceId: string, targetId: string): boolean {
    return this.connections.some(conn =>
      (conn.sourceId === sourceId && conn.targetId === targetId) ||
      (conn.sourceId === targetId && conn.targetId === sourceId)
    );
  }

  private getElementId(element: HTMLElement): string | undefined {
    const elements = Array.from(this.containerElement?.querySelectorAll('mat-card') || []);
    const index = elements.indexOf(element);
    if (index !== -1 && index < elements.length) {
      return elements[index]?.id;
    }
    return undefined;
  }

  private getElements(): Element[] {
    let elements: Element[] = [];
    this.elements$.subscribe(el => elements = el);
    return elements;
  }

  private getElementConfigById(id: string): Element | undefined {
    const elements = this.getElements();
    return elements.find(el => el.id === id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
