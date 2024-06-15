import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    this.authService.login(this.idUsuario, this.contrasenia).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/dashboard']); // Redirige a la página deseada en caso de éxito
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }, (error: any) => {
      console.error('Error al intentar iniciar sesión', error);
      alert('Ocurrió un error, por favor intenta de nuevo más tarde');
    });
  }
}