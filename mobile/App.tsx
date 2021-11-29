import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider } from "./hooks/application";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApplicationProvider>
          <Navigation />
        </ApplicationProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
