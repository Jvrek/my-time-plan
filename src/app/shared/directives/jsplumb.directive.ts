import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

      const element = this.el.nativeElement;
      this.instance.manage(element);
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
}
