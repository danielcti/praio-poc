import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider } from "./hooks/application";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ApplicationProvider>
            <Navigation />
          </ApplicationProvider>
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}
