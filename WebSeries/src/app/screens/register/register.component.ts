import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegService } from '../../services/reg.service';
import { PopupComponent } from '../../components/mensaje-emergente/mensaje-emergente.component'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    PopupComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegService], 
})
export class RegisterComponent {
  nuevoUsuario: string = '';
  nuevaContrasenia: string = '';
  confirmacionContrasenia: string = '';

  @ViewChild(PopupComponent) popup!: PopupComponent;

  constructor(private regService: RegService, private router: Router) {}

  ngAfterViewInit() {
    if (!this.popup) {
      console.error('PopupComponent no está inicializado.');
    } else {
      console.log('PopupComponent está inicializado correctamente.');
    }
  }

  onRegister(): void {
    console.log('Botón de registro apretado');
    this.popup.title = 'Mensaje'
    if (this.nuevaContrasenia === this.confirmacionContrasenia) {
      this.regService.registerUser(this.nuevoUsuario, this.nuevaContrasenia)
        .then(() => {
          this.popup.message = 'Registro exitoso.';
          this.popup.showAndRedirect();
        })
        .catch(error => {
          console.error('Error:', error);
          this.popup.message = 'El usuario ya existe.';
        });
      this.popup.show(); 
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
