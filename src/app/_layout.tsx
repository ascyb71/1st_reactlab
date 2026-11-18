import { Stack } from "expo-router";

export default function RootLayout() {
return (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="details" options={{ title: "Détail article" }} />
    <Stack.Screen name="details-clients" options={{ title: "Détail client" }} />
  </Stack>
);
}