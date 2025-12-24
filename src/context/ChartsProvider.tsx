import { useEffect, useState, type ReactNode } from 'react';
import {
  ChartsContext,
  type CountByDay,
  type StatusCount,
  type TimeSeries,
} from './charts-context';
import { api } from '@/services/api';
import type { StatusItem } from './charts-context';

interface ChartsProviderProps {
  children: ReactNode;
}

export function ChartsProvider({ children }: ChartsProviderProps) {
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);
  const [timeSeries, setTimeSeries] = useState<TimeSeries[]>([]);
  const [countByDay, setCountByDay] = useState<CountByDay[]>([]);
  // Loading is derived from data presence to avoid calling setState inside an effect
  const [days, setDays] = useState<number>(7);
  const [period, setPeriod] = useState<'month' | 'week'>('month');

  const loading =
    statusCounts.length === 0 &&
    timeSeries.length === 0 &&
    countByDay.length === 0;

  // Fetch statusCounts
  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await api.get('/object/status-counts');
        const raw = Array.isArray(response.data?.items)
          ? response.data.items
          : response.data;

        const mapped = (raw as StatusItem[]).map((item) => {
          let statusLabel = '';
          switch (item.status) {
            case '0':
              statusLabel = 'Desconhecido';
              break;
            case 'online':
              statusLabel = 'online';
              break;
            case 'offline':
              statusLabel = 'offline';
              break;
            case 'manutenção':
              statusLabel = 'Manutenção';
              break;
            default:
              break;
          }

          const val = item.value ?? item.count ?? item.total ?? 0;
          return { name: statusLabel as string, value: val };
        });
        setStatusCounts(mapped);
      } catch (error) {
        console.error('Erro ao carregar status dos objetos:', error);
      }
    };
    fetchStatusCounts();
  }, []);

  // Fetch timeSeries
  useEffect(() => {
    const fetchTimeSeries = async () => {
      try {
        const response = await api.get(
          `/interaction/time-series?range=${days}d`
        );
        setTimeSeries(response.data || []);
      } catch (error) {
        console.error('Erro ao carregar time series:', error);
      }
    };

    fetchTimeSeries();
  }, [days]);

  // Fetch countByDay
  useEffect(() => {
    const fetchCountByDay = async () => {
      try {
        const response = await api.get(
          '/interaction/count-by-day?period=' + period
        );

        // Normalize unknown response shapes into an array
        let raw: unknown = response.data ?? [];
        if (Array.isArray(raw)) {
          // ok
        } else if (raw && typeof raw === 'object') {
          const obj = raw as Record<string, unknown>;
          raw =
            (obj.data as unknown) ??
            (obj.items as unknown) ??
            Object.values(obj).flat();
        }

        const arr = Array.isArray(raw) ? (raw as unknown[]) : [];

        const formatted = arr.map((item) => {
          const it = item as Record<string, unknown>;
          const dayValue = it.day ?? it.date ?? it._id ?? '—';
          const countValue = it.count ?? it.total ?? it.interactions ?? 0;

          return {
            day: String(dayValue),
            count: Number(countValue as number) || 0,
          };
        });

        setCountByDay(formatted);
      } catch (error) {
        console.error('Erro ao carregar contagem por dia:', error);
      }
    };

    fetchCountByDay();
  }, [period]);

  return (
    <ChartsContext.Provider
      value={{
        statusCounts,
        timeSeries,
        countByDay,
        loading,
        days,
        period,
        setDays,
        setPeriod,
      }}
    >
      {children}
    </ChartsContext.Provider>
  );
}
