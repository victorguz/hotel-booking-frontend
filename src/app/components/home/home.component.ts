import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  routes = [
    {
      title: 'Administrador',
      link: '/hotels',
    },
    {
      title: 'Huesped',
      link: '/search-hotels',
    },
  ];
}
