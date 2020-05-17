import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentPage } from './pages/department.page';
import { SharedModule } from '@route-optimizer/shared/shared.module';
import { MapModule } from '@route-optimizer/modules/map/map.module';
import { RouterModule } from '@angular/router';
import { DepartmentRoutes } from '@route-optimizer/modules/admin-dashboard/modules/department/department.routes';

@NgModule({
  declarations: [DepartmentPage],
  imports: [SharedModule, MapModule, RouterModule.forChild(DepartmentRoutes)]
})
export class DepartmentModule {}
