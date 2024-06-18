import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './screens/register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent],
  templateUrl: './app.component.html',
  template: '<app-register></app-register>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WebSeries';
}
