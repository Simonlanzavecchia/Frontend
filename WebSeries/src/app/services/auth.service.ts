import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { user } from '../../types/users.types';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambia esta URL por la de tu backend

  constructor() {}

  getUserById(idUsuario: string): Observable<any> {
    return from(fetch(`${this.apiUrl}/users/${idUsuario}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
  );
  }

  login(idUsuario: string, contrasenia: string): Observable<boolean> {
    return this.getUserById(idUsuario).pipe(
      map(user => user && user.contrasenia === contrasenia)
    );
  }
}