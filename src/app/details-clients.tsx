import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { clients } from "../data/clients";

function retourClients() {
  if (router.canGoBack()) router.back();
  else router.replace("/clients");
}

export default function DetailsClients() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // String() des deux côtés : 1 et "1" deviennent égaux
  const client = clients.find((c) => String(c.id) === String(id));

  if (!client) {
    return (
      <View style={styles.container}>
        <Text style={styles.titre}>Client introuvable</Text>
        <Text>Id reçu : {String(id)}</Text>
        <Pressable style={styles.bouton} onPress={retourClients}>
          <Text style={styles.boutonTexte}>Retour aux clients</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>{client.nom}</Text>

      <View style={styles.carte}>
        <Text style={styles.ligne}>Id : {client.id}</Text>
        <Text style={styles.ligne}>Nom : {client.nom}</Text>
        <Text style={styles.ligne}>Ville : {client.ville}</Text>
        <Text style={styles.ligne}>Téléphone : {client.telephone}</Text>
      </View>

      <Pressable
        onPress={retourClients}
        style={({ pressed }) => [styles.bouton, { opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={styles.boutonTexte}>Retour aux clients</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F6FA" },
  titre: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  carte: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  ligne: { fontSize: 16, marginBottom: 8 },
  bouton: {
    backgroundColor: "#1E2330",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  boutonTexte: { color: "white", fontSize: 18, fontWeight: "bold" },
});
