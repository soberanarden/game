import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlidesData } from '../interfaces/question.interface';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  @Input() data!: SlidesData;
  @Output() saveChanges = new EventEmitter();

  constructor() {}

  public onSaveChanges(): void {
    this.saveChanges.emit();
  }
}
