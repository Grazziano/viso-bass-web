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
  const [loading, setLoading] = useState<boolean>(true);
  const [days, setDays] = useState<number>(7);
  const [period, setPeriod] = useState<'month' | 'week'>('month');

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
        let data = (response.data ?? []) as any[];

        if (!Array.isArray(data) && typeof data === 'object') {
          const obj = data as any;
          data = obj.data || obj.items || Object.values(obj).flat();
        }

        const formatted = (Array.isArray(data) ? data : []).map((item) => {
          const dayValue = item.day ?? item.date ?? item._id ?? '—';
          const countValue = item.count ?? item.total ?? item.interactions ?? 0;

          return {
            day: String(dayValue),
            count: Number(countValue) || 0,
          };
        });

        setCountByDay(formatted);
      } catch (error) {
        console.error('Erro ao carregar contagem por dia:', error);
      }
    };

    fetchCountByDay();
  }, [period]);

  // Set loading false when all data is loaded
  useEffect(() => {
    if (statusCounts.length > 0 || timeSeries.length >= 0) {
      setLoading(false);
    }
  }, [statusCounts, timeSeries]);

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
