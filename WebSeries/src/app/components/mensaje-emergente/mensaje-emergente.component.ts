import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup-overlay" *ngIf="isVisible">
      <div class="popup-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button (click)="close()">Cerrar</button>
      </div>
    </div>
  `,
  styleUrls: ['./mensaje-emergente.component.scss']
})
export class PopupComponent {
  @Input() title: string = 'Popup';
  @Input() message: string = 'Este es un mensaje de ejemplo.';
  isVisible: boolean = false;


  show() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}