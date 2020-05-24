import { Department } from '@route-optimizer/core/models/Department';
import { Requisition } from '@route-optimizer/core/models/Requisition';

export interface BusinessTripFormData {
  department?: Department;
  startDate?: string;
  finishDate?: string;
  maxDistance?: number;
  requisitions?: Requisition[];
}
