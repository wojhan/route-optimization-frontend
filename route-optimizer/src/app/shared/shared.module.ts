import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { MaterialModule } from '../modules/material/material.module';
import { LdsRollerComponent } from './components/lds-roller/lds-roller.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MapComponent } from './components/map/map.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { ConfirmRemoveModal } from './components/confirm-remove-modal/confirm-remove.modal';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AutocompleteInfiniteScrollComponent } from './components/autocomplete-infinite-scroll/autocomplete-infinite-scroll.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    LdsRollerComponent,
    JwPaginationComponent,
    PaginatorComponent,
    MapComponent,
    SpinnerOverlayComponent,
    ConfirmRemoveModal,
    ProgressBarComponent,
    AutocompleteInfiniteScrollComponent
  ],
  entryComponents: [SpinnerOverlayComponent, ConfirmRemoveModal],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    BreadcrumbModule,
    InfiniteScrollModule
  ],
  exports: [
    ReactiveFormsModule,
    JwPaginationComponent,
    CommonModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    LdsRollerComponent,
    BreadcrumbModule,
    PaginatorComponent,
    // MapComponent,
    ProgressBarComponent,
    AutocompleteInfiniteScrollComponent,
    SpinnerOverlayComponent
  ]
})
export class SharedModule {}
