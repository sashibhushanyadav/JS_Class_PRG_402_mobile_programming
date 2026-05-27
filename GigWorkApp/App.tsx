import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [cardColor, setCardColor] = useState("#3498db");

  const changeColor = () => {
    const randomColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    setCardColor(randomColor);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.cardText}>React Native Card</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={changeColor}>
        <Text style={styles.buttonText}>Change Color</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: 300,
    height: 180,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  cardText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});