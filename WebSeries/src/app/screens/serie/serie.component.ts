import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class SerieComponent implements OnInit {
  idUsuario: string = '';
  review: any = {
    Review_Title: '',
    Description: '',
    Rating: 0,
    Series_IDS: ''
  };
  serie: any = {};

  constructor(
    private route: ActivatedRoute, 
    private serieService: SeriesService,
    private reviewService: ReviewService,
    private router: Router
    
  ) {}

  reviews: any[] = [];

  ngOnInit(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (idSerie !== null) {
      this.serieService.getSerieById(idSerie).subscribe(
        (data) => {
          this.serie = data;
          // Cargar las reviews
          this.loadReviews();
        },
        (error) => {
          console.error('Error al obtener los detalles de la serie:', error);
        }
      );
    } else {
      console.error('No se proporcionó un ID de serie válido.');
    }
  }

  loadReviews(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (idSerie !== null) {
      this.reviewService.getReviewsBySeries(idSerie)
        .then((reviews) => {
          // Tomar las últimas 5 reviews
          console.log(reviews);
          this.reviews = reviews.slice(-5);
        })
        .catch(error => {
          console.error('Error al obtener las reviews:', error);
        });
    }
  }

  createReview(): void {
    console.log('enviar review');
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (idSerie !== null) {
      this.reviewService.createReview(this.idUsuario, this.review, idSerie)
        .then(() => {
          console.log('review Creada');
          // Vaciar la caja de comentarios
          this.review = {
            Review_Title: '',
            Description: '',
            Rating: 0,
            Series_IDS: ''
          };
          // Actualizar las reviews después de crear una nueva
          this.loadReviews();
        })
        .catch(error => {
          console.error('Error:', error);
          console.log('error al crear review');
        });
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
