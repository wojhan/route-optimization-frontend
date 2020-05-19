import { Route } from '@angular/router';

import { MyBusinessTripsPage } from '@route-optimizer/modules/business-trips/pages/my-business-trips/my-business-trips.page';
import { BusinessTripsPage } from '@route-optimizer/modules/business-trips/pages/business-trips.page';
import { UserResolve } from '@route-optimizer/core/UserResolve';
import { BusinessTripDetailPage } from '@route-optimizer/modules/business-trips/pages/business-trip-detail/business-trip-detail.page';
import { BusinessTripsResolver } from '@route-optimizer/modules/business-trips/business-trips.resolver';
import { BusinessTripAddPage } from '@route-optimizer/modules/business-trips/pages/business-trip-add/business-trip-add.page';

export const BusinessTripsRoutes: Route[] = [
  {
    path: '',
    component: BusinessTripsPage,
    data: {
      breadcrumb: 'Delegacje'
    },
    resolve: { user: UserResolve },
    children: [
      {
        path: 'my-business-trips',
        component: MyBusinessTripsPage,
        data: {
          breadcrumb: 'Moje delegacje'
        }
      },
      {
        path: 'add',
        component: BusinessTripAddPage,
        data: {
          breadcrumb: 'Nowa delegacja'
        }
      },
      {
        path: ':id',
        component: BusinessTripDetailPage,
        data: {
          breadcrumb: 'Szczegóły'
        },
        resolve: { businessTrip: BusinessTripsResolver }
      }
    ]
  }
];
