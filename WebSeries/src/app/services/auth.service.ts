import { inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor() { }

  getUserByName(idUsuario: string): Observable<any> {
    return from(fetch(`${this.apiUrl}/users/name/${idUsuario}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => console.error('Error:', error))
  );
  }

  getUserById(idUsuario: string): Observable<any> {
    return from(fetch(`${this.apiUrl}/users/${idUsuario}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => console.error('Error:', error))
  );
  }

  login(idUsuario: string, contrasenia: string): Observable<boolean> {
    return this.getUserByName(idUsuario).pipe(
      tap(user => console.log('Usuario obtenido:', user)),
      map(user => {
        if (user) {
          const isPasswordCorrect = user.User_Password === contrasenia;
          console.log(`Contraseña correcta: ${isPasswordCorrect}`);
          this.setLocalStorageItem('currentUser', JSON.stringify(user));
          return isPasswordCorrect;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.removeLocalStorageItem('currentUser');
  }

  getCurrentUser(): any {
    const user = this.getLocalStorageItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getLocalStorageItem('currentUser');
  }

  private getLocalStorageItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}