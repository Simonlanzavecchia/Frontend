import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service'; // Asegúrate de tener un servicio para obtener los detalles de una serie

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {
  serie: any;

  constructor(private route: ActivatedRoute, private serieService: SeriesService) {}

  ngOnInit(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');

    if (idSerie !== null) {
      this.serieService.getSerieById(idSerie).subscribe(data => {
        this.serie = data;
      });
    } else {
      // Aquí puedes manejar el caso donde idSerie es null, por ejemplo, redireccionar o mostrar un mensaje de error
      console.error('No se proporcionó un ID de serie válido.');
    }
  }
}
