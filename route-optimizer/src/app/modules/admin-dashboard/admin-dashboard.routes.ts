import { Route } from '@angular/router';
import { BaseLayoutComponent } from '@route-optimizer/modules/base-layout/base-layout.component';
import { AdminDashboardPage } from '@route-optimizer/modules/admin-dashboard/pages/admin-dashboard.page';

export const AdminDashboardRoutes: Route[] = [
  {
    path: '',
    component: AdminDashboardPage,
    data: {
      breadcrumb: 'Panel administracyjny'
    },
    children: [{ path: 'departments', loadChildren: './modules/department/department.module#DepartmentModule' }]
  }
];
