import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
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
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private serieService: SeriesService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) {}

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

  async loadReviews(): Promise<void> {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (idSerie !== null) {
      try {
        const reviews = await this.reviewService.getReviewsBySeries(idSerie);
        this.reviews = await Promise.all(reviews.slice(-5).map(async (review: any) => {
          const user = await this.authService.getUserById(review.Review_Owner).toPromise();
          return {
            ...review,
            username: user.User_Name
          };
        }));
      } catch (error) {
        console.error('Error al obtener las reviews:', error);
      }
    }
  }

  createReview(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if ((idSerie !== null) && (this.idUsuario !== null)) {
      this.reviewService.createReview(this.idUsuario, this.review, idSerie)
        .then(() => {
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