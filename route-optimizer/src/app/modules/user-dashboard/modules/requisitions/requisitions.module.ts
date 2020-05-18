import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@route-optimizer/shared/shared.module';
import { RequisitionsRoutes } from './requisitions.routes';
import { RequisitionsPage } from './pages/requisitions.page';
import { RequisitionsListPage } from './pages/requisitions-list/requisitions-list.page';
import { RequisitionEditModal } from './modals/requisition-edit/requisition-edit.modal';

@NgModule({
  declarations: [RequisitionsPage, RequisitionsListPage, RequisitionEditModal],
  entryComponents: [RequisitionEditModal],
  imports: [SharedModule, RouterModule.forChild(RequisitionsRoutes)]
})
export class RequisitionsModule {}
