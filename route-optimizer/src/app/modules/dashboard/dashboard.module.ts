import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { DashboardProfileComponent } from './components/dashboard-profile/dashboard-profile.component';
import { UpdateProfileModal } from './modals/update-profile.modal';
import { ChangePasswordModal } from './modals/change-password.modal';
import { DashboardCurrentBusinessTripComponent } from './components/dashboard-current-business-trip/dashboard-current-business-trip.component';
import { DashboardLastBusinessTripComponent } from './components/dashboard-last-business-trip/dashboard-last-business-trip.component';
import { DashboardBusinessTripStatsComponent } from './components/dashboard-business-trip-stats/dashboard-business-trip-stats.component';
import { DashboardInactiveUsersComponent } from './components/dashboard-inactive-users/dashboard-inactive-users.component';
import { DashboardLastRequisitionsComponent } from './components/dashboard-last-requisitions/dashboard-last-requisitions.component';

@NgModule({
  declarations: [
    DashboardLastRequisitionsComponent,
    DashboardProfileComponent,
    UpdateProfileModal,
    ChangePasswordModal,
    DashboardCurrentBusinessTripComponent,
    DashboardLastBusinessTripComponent,
    DashboardBusinessTripStatsComponent,
    DashboardInactiveUsersComponent
  ],
  entryComponents: [UpdateProfileModal, ChangePasswordModal],
  imports: [SharedModule],
  exports: [
    DashboardLastRequisitionsComponent,
    DashboardProfileComponent,
    UpdateProfileModal,
    ChangePasswordModal,
    DashboardCurrentBusinessTripComponent,
    DashboardLastBusinessTripComponent,
    DashboardBusinessTripStatsComponent,
    DashboardInactiveUsersComponent
  ]
})
export class DashboardModule {}
