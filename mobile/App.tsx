import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { AppProvider } from "./hooks";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AppProvider>
            <Navigation />
          </AppProvider>
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}
