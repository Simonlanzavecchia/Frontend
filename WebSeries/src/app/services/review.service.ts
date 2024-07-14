import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:3000/reviews';  // Ajusta la URL de tu API

  constructor() {}

  async createReview(idUsuario: string, review: any, idSerie: string): Promise<any> {
    const reviewData = {
      Review_Title: 'The Walking Dead',
      Description: 'JORGE',
      Rating: 4.6,
      Review_Owner: '666210c2aa10eadb535dcc5b',
      Series_IDS: idSerie
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Network response was not ok: ' + response.statusText + ' - ' + errorText);
      }

      return response.json();
    } catch (error) {
      console.error('Failed to fetch:', error);
      throw error;
    }
  }
}
