export enum TABS_OPTION {
  OVERVIEW = 1,
  HISTORY = 2,
  ALERTS = 3,
}

export interface IError {
  name: string;
  message: string;
  code: string;
  data?: unknown;
}

export interface IGenralizedInitialState<T> {
  error: string;
  status: "loading" | "fetched" | "error" | "uninitialized";
  data?: T;
}

export const RESPONSE_INITIAL_STATE = <T>(
  dataDefaultValue = {}
): IGenralizedInitialState<T> => ({
  status: "uninitialized",
  error: "",
  data: dataDefaultValue as T,
});

export type IDispatcherType = any;

export interface IACTION<T = unknown> {
  type: string | symbol;
  payload: T;
}

export interface IAPI_ACTION<T = unknown> extends IACTION<T> {
  meta: unknown;
  error: {
    name: string;
    message: string;
    stack: string;
  };
}

export interface IGetParams {
  [field: string]: string | number;
}

// API Response

export type labelType =
  | "PR Open"
  | "PR Merged"
  | "Commits"
  | "PR Reviewed"
  | "PR Comments"
  | "Incident Alerts"
  | "Incidents Resolved";

export type AuthorWorkRowData = {
  name: string;
  totalActivity: { name: labelType; value: string }[];
  dayWiseActivity: {
    date: string;
    items: {
      children: { count: string; label: labelType; fillColor: string }[];
    };
  }[];
  activeDays: {
    days: number;
    isBurnOut: boolean;
    insight: string[];
  };
};

export type UserGithubActivityResponse = {
  data: {
    AuthorWorklog: {
      activityMeta: {
        label: labelType;
        fillColor: string;
      }[];
      rows: AuthorWorkRowData[];
    };
  };
};

export interface Activity {
  name: labelType;
  value: string;
}

export interface User {
  name: string;
  totalActivity: Activity[];
  activeDays: {
    days: number;
    isBurnOut: boolean;
  };
}

export type UserActivity = {
  [key in labelType]?: string;
};
