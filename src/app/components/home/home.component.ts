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
  title = 'Jiraya Hotel';

  routes = [
    {
      title: 'Administrador',
      link: '/administrator',
    },
    {
      title: 'Visitor',
      link: '/visitor',
    },
  ];
}
