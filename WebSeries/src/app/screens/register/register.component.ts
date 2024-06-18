import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para trabajar con formularios
import { RegService } from '../../services/reg.service';
import { PopupComponent } from '../../components/mensaje-emergente/mensaje-emergente.component'; // Importa PopupComponent
import { CommonModule } from '@angular/common'; // Importa CommonModule si es necesario

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, // Si es necesario, importa CommonModule para directivas básicas como *ngIf
    FormsModule, // Importa FormsModule para trabajar con formularios en la plantilla
    PopupComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegService], // Proveedor de RegService si es necesario en este componente
})
export class RegisterComponent {
  nuevoUsuario: string = '';
  nuevaContrasenia: string = '';
  confirmacionContrasenia: string = '';

  @ViewChild(PopupComponent) popup!: PopupComponent; // ViewChild para obtener una referencia al componente PopupComponent

  constructor(private regService: RegService) {}

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
        })
        .catch(error => {
          console.error('Error:', error);
          this.popup.message = 'El usuario ya existe.';
        });
      this.popup.show(); // Muestra el popup después de actualizar el mensaje
    }
  }
}
