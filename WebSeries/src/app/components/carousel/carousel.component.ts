import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { SeriesService } from '../../services/series.service';
import { serie } from '../../../types/series.types';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [SeriesService]
})
export class CarouselComponent implements OnInit {

  seriesData: serie[] = [];

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.loadAllSeries();
  }

  loadAllSeries() {
    this.seriesService.getAllSeries().subscribe(
      (data: serie[]) => {
        this.seriesData = data;
        console.log('series traidas');
      },
      (error) => {
        console.error('Error fetching series:', error);
      }
    );
  }
}
