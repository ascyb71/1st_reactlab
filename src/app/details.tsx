import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { articles, calculerTTC } from "../data/articles";

function Bouton({ titre, onPress, couleur = "#2F5BEA", style }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bouton,
        { backgroundColor: couleur, opacity: pressed ? 0.6 : 1 },
        style,
      ]}
    >
      <Text style={styles.boutonTexte}>{titre}</Text>
    </Pressable>
  );
}

function retourCatalogue() {
  if (router.canGoBack()) router.back();
  else router.replace("/");
}

export default function Details() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const [quantite, setQuantite] = useState(1);

  // String() des deux côtés : 101 et "101" deviennent égaux
  const article = articles.find((a) => String(a.code) === String(code));

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.titre}>Article introuvable</Text>
        <Text>Code reçu : {String(code)}</Text>
        <Bouton
          titre="Retour au catalogue"
          onPress={retourCatalogue}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  const prixTTC = Number(calculerTTC(article));
  const total = prixTTC * quantite;

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>{article.nom}</Text>

      <Text style={styles.ligne}>Code : {article.code}</Text>
      <Text style={styles.ligne}>Marque : {article.marque}</Text>
      <Text style={styles.ligne}>
        Prix HT : {Number(article.prixHT).toFixed(2)} MAD
      </Text>
      <Text style={styles.ligne}>TVA : {article.tva}%</Text>
      <Text style={styles.prix}>Prix TTC : {prixTTC.toFixed(2)} MAD</Text>

      <Text style={styles.quantite}>Quantité</Text>
      <View style={styles.compteur}>
        <Bouton
          titre="−"
          onPress={() => setQuantite((q) => Math.max(1, q - 1))}
          style={styles.rond}
        />
        <Text style={styles.valeur}>{quantite}</Text>
        <Bouton
          titre="+"
          onPress={() => setQuantite((q) => q + 1)}
          style={styles.rond}
        />
      </View>

      <Text style={styles.total}>Total TTC : {total.toFixed(2)} MAD</Text>

      <Bouton
        titre="Retour au catalogue"
        onPress={retourCatalogue}
        couleur="#1E2330"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F6FA" },
  titre: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  ligne: { fontSize: 16, marginBottom: 6 },
  prix: { fontSize: 18, fontWeight: "bold", color: "#2F5BEA", marginTop: 15 },
  quantite: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },
  compteur: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  valeur: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 25,
    minWidth: 30,
    textAlign: "center",
  },
  bouton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rond: {
    width: 54,
    height: 54,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 27,
  },
  boutonTexte: { color: "white", fontSize: 18, fontWeight: "bold" },
  total: { fontSize: 22, fontWeight: "bold", color: "green", marginBottom: 25 },
});
