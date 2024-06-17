import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ElementConfig } from '../../models/element.config';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  @Input() config!: ElementConfig;
  @Output() removeElement = new EventEmitter<void>();
  @Output() startConnectionEvent = new EventEmitter<HTMLElement>();

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    console.log(this.config);
  }

  get inputs() {
    return this.config.inputs;
  }

  startConnection() {
    const cardElement = this.elRef.nativeElement.querySelector('mat-card');
    this.startConnectionEvent.emit(cardElement);
  }

  remove() {
    this.removeElement.emit();
  }
}
