import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { clients } from "../../../data/clients";
export default function Clients() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titre}>Liste des clients</Text>

      {clients.map((c) => (
        <Pressable
          key={c.id}
          onPress={() => router.push(`/details-clients?id=${c.id}`)}
          style={({ pressed }) => [
            styles.carte,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.nom}>{c.nom}</Text>
          <Text>{c.ville}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F6FA", padding: 15 },
  titre: { fontSize: 25, fontWeight: "bold", marginBottom: 20 },
  carte: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
  },
  nom: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
});
