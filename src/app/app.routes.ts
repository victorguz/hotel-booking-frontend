import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'administrator',
    loadComponent: () =>
      import('./components/administrator/administrator.component').then(
        (m) => m.AdministratorComponent
      ),
  },
  {
    path: 'visitor',
    loadComponent: () =>
      import('./components/visitor/visitor.component').then(
        (m) => m.VisitorComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
