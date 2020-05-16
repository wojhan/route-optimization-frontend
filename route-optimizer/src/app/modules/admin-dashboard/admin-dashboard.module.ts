import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDashboardRoutes } from '@route-optimizer/modules/admin-dashboard/admin-dashboard.routes';
import { BaseLayoutModule } from '@route-optimizer/modules/base-layout/base-layout.module';
import { AdminDashboardPage } from './pages/admin-dashboard.page';

@NgModule({
  declarations: [AdminDashboardPage],
  imports: [CommonModule, BaseLayoutModule, RouterModule.forChild(AdminDashboardRoutes)]
})
export class AdminDashboardModule {}
