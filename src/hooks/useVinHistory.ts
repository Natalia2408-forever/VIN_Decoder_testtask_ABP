import { useCallback, useState } from 'react';
import { DecodeVinResult } from '../types/vin';

export interface VinHistoryEntry {
  vin: string;
  timestamp: number;
  results: DecodeVinResult[];
  message: string;
}

const STORAGE_KEY = 'vinDecoderHistory';
const MAX_ENTRIES = 3;

function readHistory(): VinHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VinHistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function useVinHistory() {
  const [history, setHistory] = useState<VinHistoryEntry[]>(() =>
    readHistory(),
  );

  const addEntry = useCallback((entry: VinHistoryEntry) => {
    setHistory(prev => {
      const withoutDuplicate = prev.filter(item => item.vin !== entry.vin);
      const next = [entry, ...withoutDuplicate].slice(0, MAX_ENTRIES);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }, []);

  return { history, addEntry };
}
