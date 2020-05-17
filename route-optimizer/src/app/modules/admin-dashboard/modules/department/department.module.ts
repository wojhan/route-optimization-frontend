import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@route-optimizer/shared/shared.module';
import { MapModule } from '@route-optimizer/modules/map/map.module';
import { DepartmentRoutes } from './department.routes';
import { AddDepartmentModal } from './modals/add-department/add-department.modal';
import { DepartmentPage } from './pages/department.page';

@NgModule({
  declarations: [DepartmentPage, AddDepartmentModal],
  entryComponents: [AddDepartmentModal],
  imports: [SharedModule, MapModule, RouterModule.forChild(DepartmentRoutes)]
})
export class DepartmentModule {}
