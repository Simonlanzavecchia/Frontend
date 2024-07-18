import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:3000/reviews';

  constructor() {}

  async createReview(idUsuario: string, review: any, idSerie: string): Promise<any> {
    var userString = localStorage.getItem('currentUser');
    if (userString !== null){
      const user = JSON.parse(userString);
      const reviewData = {
        Review_Title: review.Review_Title,
        Description: review.Description,
        Rating: review.Rating,
        Review_Owner: user._id,
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

  async getReviewsBySeries(idSerie: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/series/${idSerie}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Network response was not ok: ' + response.statusText + ' - ' + errorText);
      }
      // Tomar las reviews unicamente
      return response.json();
    } catch (error) {
      console.error('Failed to fetch:', error);
      throw error;
    }
  }

}
