import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, MenuModule, ToastModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: any[];

  constructor() {
    this.items = [
      {
        label: 'File',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus' },
          { label: 'Open', icon: 'pi pi-fw pi-external-link' }
        ]
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', icon: 'pi pi-fw pi-undo' },
          { label: 'Redo', icon: 'pi pi-fw pi-redo' }
        ]
      }
    ];
  }

  toggleMenu(event: Event, menu: any) {
    menu.toggle(event);
  }
}
