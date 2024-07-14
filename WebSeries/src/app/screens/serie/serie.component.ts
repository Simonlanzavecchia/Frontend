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
  imports: [CommonModule, FormsModule, HttpClientModule]  // Asegúrate de importar HttpClientModule aquí
})
export class SerieComponent implements OnInit {
  idUsuario: string = '';
  review: any = {
    Review_Title: '',
    Description: '',
    Rating: 0,
    Series_IDS: ''
  };
  serie: any;

  constructor(
    private route: ActivatedRoute, 
    private serieService: SeriesService,
    private reviewService: ReviewService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (idSerie !== null) {
      this.serieService.getSerieById(idSerie).subscribe(
        (data) => {
          this.serie = data;
        },
        (error) => {
          console.error('Error al obtener los detalles de la serie:', error);
        }
      );
    } else {
      console.error('No se proporcionó un ID de serie válido.');
    }
  }

  createReview(): void {
    console.log('enviar review'); // Agrega un log para verificar que se llama el método
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (idSerie !== null) {
      this.reviewService.createReview(this.idUsuario, this.review, idSerie)
        .then(() => {
          console.log('review Creada');
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
