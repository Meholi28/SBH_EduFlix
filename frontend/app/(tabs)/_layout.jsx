// app/(tabs)/_layout.jsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#E50914",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          height: Platform.OS === "android" ? 60 : 80,
          paddingBottom: Platform.OS === "android" ? 5 : 20,
          paddingTop: 5,
          backgroundColor: "#1a1a1a",
          borderTopWidth: 0.5,
          borderTopColor: "#333",
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === "android" ? 0 : 5,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case "home":
              iconName = "home-outline";
              break;
            case "courses":
              iconName = "book-outline";
              break;
            case "ai-tutor":
              iconName = "chatbubble-ellipses-outline";
              break;
            case "progress":
              iconName = "stats-chart-outline";
              break;
            case "social":
              iconName = "people-outline";
              break;
          }
          return (
            <Ionicons 
              name={iconName} 
              size={focused ? 24 : 22} 
              color={color} 
              style={{ marginBottom: Platform.OS === "android" ? 0 : 5 }}
            />
          );
        },
      })}
    />
  );
}