import { createContext } from 'react';

export type StatusItem = {
  status?: number | string;
  name?: string;
  count?: number;
  total?: number;
  value?: number;
};

export type StatusCount = {
  name: string;
  value: number;
};

export type TimeSeries = {
  date: string;
  interactions: number;
};

export type CountByDay = {
  day: string;
  count: number;
};

export interface IChartsContext {
  statusCounts: StatusCount[];
  timeSeries: TimeSeries[];
  countByDay: CountByDay[];
  loading: boolean;
  days: number;
  period: 'month' | 'week';
  setDays: (days: number) => void;
  setPeriod: (period: 'month' | 'week') => void;
}

export const ChartsContext = createContext<IChartsContext | undefined>(
  undefined
);
