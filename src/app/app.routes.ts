import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:"",loadComponent:()=>import("./components/administrator/administrator.component").then(m=>m.AdministratorComponent)}
];
