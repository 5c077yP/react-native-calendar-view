import React, { useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_STORAGE_KEY = '@my_events';

// @see https://docs.expo.dev/versions/v46.0.0/sdk/calendar/#event
export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

type Store = {
  events: Event[];
};

const initialState: Store = {
  events: [],
};

type StoreUpdater = React.Dispatch<React.SetStateAction<Store>>;

export const SimpleStoreCtx = React.createContext<
  readonly [Store, StoreUpdater]
>([initialState, () => {}]);

const mapEvent = (e: Event) => ({
  ...e,
  startDate: new Date(e.startDate),
  ...(e.endDate ? { endDate: new Date(e.endDate) } : {}),
});

export const usePrefillEvents = (setData: StoreUpdater) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(EVENTS_STORAGE_KEY)
      .then((value) => {
        if (!value) {
          return;
        }
        setData((p) => ({
          ...p,
          events: JSON.parse(value).map(mapEvent),
        }));
      })
      .catch(() => {
        console.error('failed to load events');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading };
};

export const useStoreState = () => {
  const [store, setStore] = useState<Store>(initialState);

  const { loading } = usePrefillEvents(setStore);

  const nextSetStore: StoreUpdater = useCallback((st) => {
    setStore((prevStore) => {
      const nextStore = typeof st === 'function' ? st(prevStore) : st;

      if (nextStore === prevStore) {
        return prevStore;
      }

      if (nextStore.events !== prevStore.events) {
        AsyncStorage.setItem(
          EVENTS_STORAGE_KEY,
          JSON.stringify(nextStore.events),
        ).catch((err) => {
          console.error('failed to save events', err);
        });
      }

      return nextStore;
    });
  }, []);

  const noop = () => {};

  return {
    loading,
    initialState: [store, loading ? noop : nextSetStore],
  } as const;
};

export const useStore = () => {
  return useContext(SimpleStoreCtx);
};

// events
export const useAddEvent = () => {
  const [store, setStore] = useStore();
  return React.useCallback(
    async (event: Event) => {
      setStore((prev) => ({
        events: [...prev.events, event],
      }));
    },
    [store.events],
  );
};
