export const GET_PENDING_EMPLOYEES = 'GET_PENDING_EMPLOYEES';
export const APPROVE_EMPLOYEE = 'APPROVE_EMPLOYEE';
export const REJECT_EMPLOYEE = 'REJECT_EMPLOYEE';
export const GET_ARTS = 'GET_ARTS';
export const CREATE_ART = 'CREATE_ART';
export const GET_METRICS = 'GET_METRICS';
export const UPDATE_FILTERED_ARTS = 'UPDATE_FILTERED_ARTS'
export const UPDATE_FILTERED_EMP = 'UPDATE_FILTERED_EMP'
export const UPDATE_ACTIVE_ART = 'UPDATE_ACTIVE_ART'

interface Employee {
  _id: string;
  name: string;
  email: string;
  approved: boolean;
}

interface Art {
  _id: string;
  title: string;
  description: string;
  time_to_complete: number;
}

interface Metric {
  art_title: string;
  count: number;
}

export interface MetricParams {
  startDate: string;
  endDate: string;
}

export interface AdminState {
  pendingEmployees: Employee[];
  arts: Art[];
  metrics: Metric[];
  filteredArts: any;
  filteredEmp: any;
  activeArt: Art | null
}

interface GetPendingEmployeesAction {
  type: typeof GET_PENDING_EMPLOYEES;
  payload: Employee[];
}

interface ApproveEmployeeAction {
  type: typeof APPROVE_EMPLOYEE;
  payload: Employee[];
}

interface RejectEmployeeAction {
  type: typeof REJECT_EMPLOYEE;
  payload: Employee[];
}

interface GetArtsAction {
  type: typeof GET_ARTS;
  payload: Art[];
}

interface CreateArtAction {
  type: typeof CREATE_ART;
  payload: Art;
}

interface FilteredArtAction {
  type: typeof UPDATE_FILTERED_ARTS;
  payload: Art;
}

interface FilteredEmpAction {
  type: typeof UPDATE_FILTERED_EMP;
  payload: Employee;
}

interface GetMetricsAction {
  type: typeof GET_METRICS;
  payload: Metric[];
}

interface updateActiveArtAction {
  type: typeof UPDATE_ACTIVE_ART;
  payload: Art;
}

export type AdminActionTypes =
  | GetPendingEmployeesAction
  | ApproveEmployeeAction
  | RejectEmployeeAction
  | GetArtsAction
  | CreateArtAction
  | FilteredArtAction
  | FilteredEmpAction
  | updateActiveArtAction
  | GetMetricsAction;
