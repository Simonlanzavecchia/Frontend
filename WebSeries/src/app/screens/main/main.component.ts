import { Component, ViewChild } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CarouselComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('carousel') carousel!: CarouselComponent;

  ngAfterViewInit() {}

  onGenreSelected(genre: string) {
    if (genre === 'Mejor rating') {
      this.carousel.loadAllSeries();
    } else {
      this.carousel.loadSeriesGenre(genre);
    }
  }
}
