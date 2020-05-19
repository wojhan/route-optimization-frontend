import { Employee } from './Employee';
import { Route } from './Route';
import { Requisition } from './Requisition';
import { Department } from '@route-optimizer/core/models/Department';

export class BusinessTrip {
  id: number;
  startDate: string;
  startDateAsDate: Date;
  finishDate: string;
  finishDateAsDate: Date;
  duration: number;
  distance: number;
  assignee: Employee;
  department: Department;
  estimatedProfit: number;
  routes: Route[];
  requistions: Requisition[];
  requisitions: Requisition[];
  maxDistance: number;
  isProcessed: boolean;
}
