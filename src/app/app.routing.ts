import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/tables/smarttables' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
