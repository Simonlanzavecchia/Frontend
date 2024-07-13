import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { serie } from '../../../types/series.types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CarouselModule,
    RouterModule // Agrega RouterModule a la lista de imports
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [SeriesService]
})


export class CarouselComponent implements OnInit {

  seriesData: serie[] = [];
  title: string = 'Mejor rating';

  constructor(private seriesService: SeriesService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllSeries();
  }


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  public loadAllSeries() {
    this.seriesService.getAllSeries().subscribe(
      (data: serie[]) => {
        this.seriesData = data;
        this.title = 'Mejor rating';
        console.log('series traidas');
      },
      (error) => {
        console.error('Error fetching series:', error);
      }
    );
  }

  public loadSeriesGenre(genre: string) {
    this.seriesService.getSeriesGenre(genre).subscribe(
      (data: serie[]) => {
        this.seriesData = data;
        this.title = genre;
        console.log('series de genero traidas');
      },
      (error) => {
        console.error('Error fetching series:', error);
      }
    );
  }

  goToSeriesDetails(idSerie: string): void {
    this.router.navigate(['/series', idSerie]);
  }

}
