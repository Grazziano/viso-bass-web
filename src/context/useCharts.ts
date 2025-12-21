import { useContext } from 'react';
import { ChartsContext, type IChartsContext } from './charts-context';

export function useCharts(): IChartsContext {
  const context = useContext(ChartsContext);
  if (!context) {
    throw new Error('useCharts deve ser usado dentro de um ChartsProvider');
  }
  return context;
}
