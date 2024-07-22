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
          response.json().then(data => {
            console.log('Success:', data);
            resolve(data); 
          });
        } else {
          reject(new Error('Network response was not ok ' + response.statusText));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }
}

