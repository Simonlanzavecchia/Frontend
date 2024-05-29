import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { serie } from '../../types/series.types';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private apiUrl = 'http://localhost:3000'; // URL de tu API

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
}
