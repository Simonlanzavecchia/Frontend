import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss'],
})
export class SerieComponent implements OnInit {
  serie: any;

  constructor(
    private route: ActivatedRoute, 
    private serieService: SeriesService,
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

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
