import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  title = 'BookingHotels.com';

  routes = [
    {
      title: 'Inicio',
      link: '/',
    },
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
