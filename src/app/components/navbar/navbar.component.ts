import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  title = 'Jiraya Hotel';

  routes = [
    {
      title: 'Inicio',
      link: '/',
    },
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
