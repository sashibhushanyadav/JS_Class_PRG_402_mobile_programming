import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import styles from "./styles/AppStyles";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = () => {
    Alert.alert("Success", "Signed in successfully");

    setSignedIn(true);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {!signedIn ? (
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Open Sign In</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Hi, {username} 👋</Text>
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
              placeholder="Enter Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />

            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity
              style={[
                styles.signInButton,
                !(username && password) && styles.disabledButton,
              ]}
              disabled={!(username && password)}
              onPress={handleSignIn}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
// export default function App() {
//   const [cardColor, setCardColor] = useState("#3498db");

//   const changeColor = () => {
//     const randomColor =
//       "#" + Math.floor(Math.random() * 16777215).toString(16);
//     setCardColor(randomColor);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={[styles.card, { backgroundColor: cardColor }]}>
//         <Text style={styles.cardText}>React Native Card</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={changeColor}>
//         <Text style={styles.buttonText}>Change Color</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   card: {
//     width: 300,
//     height: 180,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 5,
//   },
//   cardText: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   button: {
//     backgroundColor: "#222",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
