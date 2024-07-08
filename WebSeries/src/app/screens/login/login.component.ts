import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  idUsuario: string = '';
  contrasenia: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    console.log('Botón de Iniciar Sesión presionado'); // Agrega un log para verificar que se llama el método
    this.authService.login(this.idUsuario, this.contrasenia).pipe(
        tap((success: boolean) => {
            if (success) {
                this.router.navigate(['/']); // Redirige a la página deseada en caso de éxito
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }),
        catchError((error: any) => {
            console.error('Error al intentar iniciar sesión');
            alert('Ocurrió un error, por favor intenta de nuevo más tarde');
            return of(null); // Devuelve un observable vacío para finalizar el stream
        })
    ).subscribe();
  }
}