import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { SimpleStoreCtx, useStoreState } from './context/SimpleStore';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { initialState, loading: loadingStoreData } = useStoreState();

  if (!isLoadingComplete || loadingStoreData) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SimpleStoreCtx.Provider value={initialState}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SimpleStoreCtx.Provider>
      </SafeAreaProvider>
    );
  }
}
