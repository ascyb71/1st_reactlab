import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
return (
<Tabs screenOptions={{ tabBarActiveTintColor: "#2F5BEA" }}>
    <Tabs.Screen
    name="index"
    options={{
        title: "Catalogue",
        tabBarIcon: () => <Text style={{ fontSize: 20 }}></Text>,
    }}
    />
    <Tabs.Screen
    name="clients"
    options={{
        title: "Clients",
        tabBarIcon: () => <Text style={{ fontSize: 20 }}></Text>,
    }}
    />
</Tabs>
);
}