import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, defer, EMPTY, from, Observable, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import * as L from 'leaflet';

import { environment } from '@route-optimizer/environment/environment';
import { queryPaginated } from '@route-optimizer/core/helpers/pagination';
import { Department } from '@route-optimizer/core/models/Department';
import { Page } from '@route-optimizer/core/models/Page';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiDepartmentsUrl = `${environment.apiUrl}api/departments/`;
  private perPage = environment.defaultPaginationSize;

  constructor(private mapService: MapService, private http: HttpClient) {}

  list(urlOrFilter?: string | object, pageSize?: number): Observable<Page<Department>> {
    return queryPaginated<Department>(this.http, this.apiDepartmentsUrl, pageSize ? pageSize : this.perPage, urlOrFilter);
  }

  getAllDepartments(page?: string): Observable<Department> {
    return defer(() => {
      return this.list(page).pipe(
        mergeMap(({ results, next }) => {
          const results$ = from(results);
          const next$ = next ? this.getAllDepartments(next) : EMPTY;
          return concat(results$, next$);
        })
      );
    });
  }

  createDepartment(department: Department): Observable<Department> {
    const addressFirstLine = (department.street ? department.street : '') + ` ${department.houseNo}`;
    const addressSecondLine = `${department.postcode} ${department.city}`;
    return this.mapService.getCoordsFromAddress(`${addressFirstLine}, ${addressSecondLine}`).pipe(
      catchError(err => {
        return throwError(err);
      }),
      switchMap((latLng: L.LatLng) => {
        department.latitude = latLng.lat;
        department.longitude = latLng.lng;
        return this.http.post<Department>(this.apiDepartmentsUrl, department);
      })
    );
  }

  deleteDepartment(departmentId: number) {
    const url = this.apiDepartmentsUrl + `${departmentId}/`;
    return this.http.delete(url);
  }
}
