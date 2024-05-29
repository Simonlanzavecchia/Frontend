import { Component, OnInit } from '@angular/core';
import { serie } from '../../../types/series.types';
import { SeriesService } from '../../services/series.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
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
        console.log('series ', this.seriesData)
      },
      (error) => {
        console.log('Error fetching series:', error);
      }
    );
  }
}
