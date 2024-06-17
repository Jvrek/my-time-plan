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
  @Output() updateElement = new EventEmitter<{ id: string, key: string, value: any }>();

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    console.log(this.config);
  }

  get inputs() {
    return this.config.inputs;
  }

  updateInput(value: string, index: number) {
    const newInputs = [...this.config.inputs];
    newInputs[index] = value;
    this.updateElement.emit({ id: this.config.id, key: 'inputs', value: newInputs });
  }

  updateName(value: string) {
    this.updateElement.emit({ id: this.config.id, key: 'name', value });
  }

  startConnection() {
    const cardElement = this.elRef.nativeElement.querySelector('mat-card');
    this.startConnectionEvent.emit(cardElement);
  }

  remove() {
    this.removeElement.emit();
  }
}
