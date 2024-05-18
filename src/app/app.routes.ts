import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (component) => component.HomeComponent
      ),
  },
  {
    path: 'hotels',
    loadComponent: () =>
      import('./components/hotel-list/hotel-list.component').then(
        (component) => component.HotelListComponent
      ),
  },
  {
    path: 'hotels/:id',
    loadComponent: () =>
      import('./components/hotel-detail/hotel-detail.component').then(
        (component) => component.HotelDetailComponent
      ),
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('./components/reservation-list/reservation-list.component').then(
        (component) => component.ReservationListComponent
      ),
  },
  {
    path: 'reservations/:id',
    loadComponent: () =>
      import(
        './components/reservation-detail/reservation-detail.component'
      ).then((component) => component.ReservationDetailComponent),
  },
  {
    path: 'search-hotels',
    loadComponent: () =>
      import('./components/search-hotels/search-hotels.component').then(
        (component) => component.SearchHotelsComponent
      ),
  },
  {
    path: 'reserve/:id',
    loadComponent: () =>
      import('./components/reservation-form/reservation-form.component').then(
        (component) => component.ReservationFormComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
