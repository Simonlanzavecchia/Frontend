import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CarouselComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
