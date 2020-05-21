import { Route } from '@angular/router';
import { RequisitionsPage } from '@route-optimizer/modules/user-dashboard/modules/requisitions/pages/requisitions.page';
import { RequisitionsListPage } from '@route-optimizer/modules/user-dashboard/modules/requisitions/pages/requisitions-list/requisitions-list.page';

export const RequisitionsRoutes: Route[] = [
  {
    path: '',
    component: RequisitionsPage,
    data: {
      breadcrumb: 'Oferty'
    },
    children: [
      {
        path: '',
        component: RequisitionsListPage,
        data: {
          breadcrumb: null
        }
      }
    ]
  }
];
