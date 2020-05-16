import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './modules/login/pages/login.page';
import { RegistrationPage } from './modules/registration/pages/registration.page';
import { RegistrationCompletePage } from './modules/registration/pages/registration-complete.page';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { BaseLayoutComponent } from '@route-optimizer/modules/base-layout/base-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-panel', pathMatch: 'full' },
  { path: 'admin-panel', loadChildren: './modules/admin-dashboard/admin-dashboard.module#AdminDashboardModule' },
  { path: 'user-panel', loadChildren: './modules/user-dashboard/user-dashboard.module#UserDashboardModule' },
  { path: 'business-trips', loadChildren: './modules/business-trips/business-trips.module#BusinessTripsModule' },
  { path: 'login', component: LoginPage, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegistrationPage, canActivate: [NoAuthGuard] },
  { path: 'register/complete', component: RegistrationCompletePage, canActivate: [NoAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
