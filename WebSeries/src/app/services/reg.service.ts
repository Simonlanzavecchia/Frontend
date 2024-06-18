import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RegService {
  private apiUrl = 'http://localhost:3000';
  url = this.apiUrl + "/users/"
  constructor() { }

  registerUser(idUser: string, contrasenia: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(this.url + idUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: idUser, password: contrasenia })
      }).then(response => {
        if (response.status === 200) {
          // Si la respuesta es 200 OK, se considera exitosa
          response.json().then(data => {
            // Aquí puedes manejar los datos de respuesta si es necesario
            console.log('Success:', data);
            resolve(data); // Resuelve la promesa con los datos
          });
        } else {
          // Si la respuesta no es 200 OK, se considera un error
          reject(new Error('Network response was not ok ' + response.statusText));
        }
      }).catch(error => {
        // Si hay un error, se rechaza la promesa con el error
        reject(error);
      });
    });
  }
}

