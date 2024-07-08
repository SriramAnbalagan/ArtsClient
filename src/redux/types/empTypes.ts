export const SELECT_ART = 'SELECT_ART';
export const FINISH_ART = 'FINISH_ART';

interface SelectArtAction {
  type: typeof SELECT_ART;
  payload: {
    art: any;
    startTime: Date | null;
  };
}

interface FinishArtAction {
  type: typeof FINISH_ART;
  payload: {
    artId: string;
    endTime: Date;
    totalTime: number;
  };
}

export type EmployeeActionTypes = SelectArtAction | FinishArtAction;
