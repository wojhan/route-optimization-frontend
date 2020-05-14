import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-base-layout-sidebar-item',
  templateUrl: './base-layout-sidebar-item.component.html',
  styleUrls: ['./base-layout-sidebar-item.component.scss']
})
export class BaseLayoutSidebarItemComponent implements OnChanges {
  @Input() link: string[];
  @Input() exact = false;
  @Input() expandable = true;

  routerLinkActive;
  routerLinkOptions;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const exact = this.exact;
    this.routerLinkOptions = {
      exact
    };
    this.routerLinkActive = this.expandable ? 'active' : '';
  }
}
