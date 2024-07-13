import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { serie } from '../../types/series.types';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private apiUrl = 'http://localhost:3000';

  constructor() {}

  getAllSeries(): Observable<serie[]> {
    return from(
      fetch(`${this.apiUrl}/series`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error fetching series:', error);
          throw error;
        })
    );
  }

  getSeriesGenre(genero: string): Observable<serie[]> {
    return from(
      fetch(`${this.apiUrl}/series/genero/`+genero)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error fetching series:', error);
          throw error;
        })
    );
  }

  getSeriesName(nombre: string): Observable<serie> {
    return from(
      fetch(`${this.apiUrl}/series/name/`+nombre)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error fetching series:', error);
          throw error;
        })
    );
  }

  getSerieById(id: string): Observable<serie> {
    return from(
      fetch(`${this.apiUrl}/series/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error fetching serie:', error);
          throw error;
        })
    );
  }

}
