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
    console.log('Botón de Iniciar Sesión presionado');
    this.authService.login(this.idUsuario, this.contrasenia).pipe(
      tap((success: boolean) => {
        if (success) {
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/']);
          this.authService.setActiveSession();
        } else {
          console.log('Usuario o contraseña incorrectos');
          alert('Usuario o contraseña incorrectos');
          this.authService.setUnactiveSession();
        }
      }),
      catchError((error: any) => {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Ocurrió un error, por favor intenta de nuevo más tarde');
        return of(null);
      })
    ).subscribe();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
  
}