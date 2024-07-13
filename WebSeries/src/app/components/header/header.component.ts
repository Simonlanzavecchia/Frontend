import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() genreSelected = new EventEmitter<string>();
  items: MenuItem[];
  menuVisible = false;
  loginMenuVisible = false;
  searchTerm: string = '';

  constructor(private router: Router, private seriesService: SeriesService) {
    this.items = [
      {
        label: 'Ver',
        items: [
          { label: 'Mejor rating', icon: 'pi pi-star' },
          { label: 'Horror', icon: 'pi pi-prime' },
          { label: 'Romance', icon: 'pi pi-heart-fill'}
        ]
      }
    ];
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
    if (this.menuVisible) {
      this.loginMenuVisible = false;
    }
  }

  toggleLoginMenu(event: Event) {
    event.stopPropagation();
    this.loginMenuVisible = !this.loginMenuVisible;
    if (this.loginMenuVisible) {
      this.menuVisible = false;
    }
  }

  menuItemClicked() {
    this.menuVisible = false;
  }

  loginMenuItemClicked() {
    this.loginMenuVisible = false;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  selectGenre(genre: string | undefined) {
    if (genre) {
      this.genreSelected.emit(genre);
      console.log("Publico genero: " + genre);
      this.menuVisible = false;
    } else {
      console.error("Invalid genre");
    }
  }

  searchSeries() {
    if (this.searchTerm) {
      this.seriesService.getSeriesName(this.searchTerm).subscribe(
        series => {
          if (series) {
            this.goToSeriesDetails(series._id);
          } else {
            console.error("Serie no encontrada");
          }
        },
        error => {
          console.error('Error fetching series:', error);
        }
      );
    }
  }

  goToSeriesDetails(idSerie: string): void {
    this.router.navigate(['/series', idSerie]);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (
      !document.getElementsByClassName('menu')[0].contains(event.target as Node) &&
      !document.getElementsByClassName('login-menu')[0].contains(event.target as Node)
    ) {
      this.menuVisible = false;
      this.loginMenuVisible = false;
    }
  }
}