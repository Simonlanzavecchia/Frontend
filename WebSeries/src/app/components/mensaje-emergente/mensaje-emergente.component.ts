import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  showAndRedirect(timeout: number = 2000) {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
      this.router.navigate(['/']); // Redirige a la página de inicio (ajusta la ruta según sea necesario)
    }, timeout);
  }


  show() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}