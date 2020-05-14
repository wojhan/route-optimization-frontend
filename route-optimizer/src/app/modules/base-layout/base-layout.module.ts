import { NgModule } from '@angular/core';

import { SharedModule } from '@route-optimizer/shared/shared.module';
import { BaseLayoutComponent } from '@route-optimizer/modules/base-layout/base-layout.component';
import { BaseLayoutSidebarComponent } from './components/sidebar/base-layout-sidebar/base-layout-sidebar.component';
import { BaseLayoutNavbarComponent } from './components/base-layout-navbar/base-layout-navbar.component';
import { BaseLayoutUserSidebarComponent } from './components/sidebar/base-layout-user-sidebar/base-layout-user-sidebar.component';
import { BaseLayoutAdminSidebarComponent } from './components/sidebar/base-layout-admin-sidebar/base-layout-admin-sidebar.component';
import { BaseLayoutSidebarItemComponent } from './components/sidebar/base-layout-sidebar-item/base-layout-sidebar-item.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    BaseLayoutSidebarComponent,
    BaseLayoutNavbarComponent,
    BaseLayoutUserSidebarComponent,
    BaseLayoutAdminSidebarComponent,
    BaseLayoutSidebarItemComponent
  ],
  imports: [SharedModule],
  exports: [BaseLayoutComponent, BaseLayoutSidebarComponent, BaseLayoutUserSidebarComponent, BaseLayoutAdminSidebarComponent]
})
export class BaseLayoutModule {}
