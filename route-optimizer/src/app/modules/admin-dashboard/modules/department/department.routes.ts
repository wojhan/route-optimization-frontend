import { Route } from '@angular/router';

import { DepartmentPage } from './pages/department.page';

export const DepartmentRoutes: Route[] = [{ path: '', component: DepartmentPage, data: { breadcrumb: 'Filie firmy' } }];
