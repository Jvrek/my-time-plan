import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BrowserJsPlumbInstance, FullOverlaySpec, newInstance } from '@jsplumb/browser-ui';

@Directive({
  selector: '[appJsPlumb]',
  standalone: true
})
export class JsPlumbDirective implements OnInit, OnChanges {
  @Input('appJsPlumb') container: HTMLElement | null = null;
  @Input() connections: { sourceId: string, targetId: string }[] = [];
  private instance: BrowserJsPlumbInstance | null = null;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.container) {
      this.instance = newInstance({
        container: this.container
      });

      this.initializeElements();
    } else {
      console.error("Container element not provided");
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['container'] && this.container) {
      this.instance = newInstance({
        container: this.container
      });
      this.initializeElements();
    }

    if (changes['connections'] && this.connections.length > 0 && this.instance) {
      this.drawConnections();
    }
  }

  private initializeElements(): void {
    const elements = this.el.nativeElement.children;
    for (let element of elements) {
      this.instance?.manage(element);
      this.addDragHandlers(element);
    }
  }

  private drawConnections(): void {
    const arrowOverlay: FullOverlaySpec = {
      type: 'Arrow',
      options: {
        width: 10,
        length: 10,
        location: 1,
        id: 'arrow'
      }
    };

    this.instance?.deleteEveryConnection();
    this.connections.forEach(conn => {
      const sourceElement = document.getElementById(conn.sourceId);
      const targetElement = document.getElementById(conn.targetId);
      if (sourceElement && targetElement) {
        this.instance?.connect({
          source: sourceElement,
          target: targetElement,
          connector: 'Flowchart',
          anchor: 'Continuous',
          endpoint: 'Blank',
          paintStyle: { stroke: 'blue', strokeWidth: 2 },
          overlays: [arrowOverlay]
        });
      }
    });
  }

  private addDragHandlers(element: HTMLElement): void {
    let startX = 0, startY = 0, initialX = 0, initialY = 0;

    const mouseDownHandler = (event: MouseEvent) => {
      event.preventDefault();
      startX = event.clientX - element.offsetLeft;
      startY = event.clientY - element.offsetTop;

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      element.style.left = `${dx}px`;
      element.style.top = `${dy}px`;

      this.instance?.repaintEverything();
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    element.addEventListener('mousedown', mouseDownHandler);
  }
}
