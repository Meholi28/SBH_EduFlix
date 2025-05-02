import { Stack, router } from "expo-router";
import { useState } from "react";
import SplashScreen from "./splash";
import { useEffect } from "react";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash) {
      router.replace("/onboarding/onboarding1");
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}