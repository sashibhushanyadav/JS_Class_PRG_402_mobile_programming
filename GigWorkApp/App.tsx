
import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { styles } from "./styles/HomeStyle";

const categories = [
  "Grocery Staff",
  "Accountant",
  "Tutor",
  "Delivery Helper",
  "Event Assistant",
  "Cleaner",
];

const workers = [
  {
    id: "1",
    name: "John Smith",
    role: "Accountant",
    rate: "$20/hr",
    rating: "4.9",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    role: "Tutor",
    rate: "$18/hr",
    rating: "4.8",
  },
];

const jobs = [
  {
    id: "1",
    title: "Grocery Store Helper",
    company: "Fresh Mart",
    duration: "1 Day",
    pay: "$80",
  },
  {
    id: "2",
    title: "Math Tutor",
    company: "Learning Hub",
    duration: "4 Hours",
    pay: "$50",
  },
];

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>QuickHire</Text>
          <Text style={styles.subTitle}>
            Find work or hire instantly
          </Text>
        </View>

        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />
      </View>

      {/* Search */}
      <TextInput
        placeholder="Find workers or jobs..."
        style={styles.searchInput}
      />

      {/* Hero Section */}
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>
          Hire trusted workers
        </Text>

        <Text style={styles.heroText}>
          Hire workers for an hour, a day, or whenever
          you need help.
        </Text>

        <TouchableOpacity style={styles.heroButton}>
          <Text style={styles.heroButtonText}>
            Explore Jobs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>
        Categories
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.categoryCard}>
            <Text style={styles.categoryText}>
              {item}
            </Text>
          </View>
        )}
      />

      {/* Featured Workers */}
      <Text style={styles.sectionTitle}>
        Featured Workers
      </Text>

      {workers.map((worker) => (
        <View key={worker.id} style={styles.workerCard}>
          <View>
            <Text style={styles.workerName}>
              {worker.name}
            </Text>

            <Text style={styles.workerRole}>
              {worker.role}
            </Text>

            <Text style={styles.workerInfo}>
              ⭐ {worker.rating} • {worker.rate}
            </Text>
          </View>

          <TouchableOpacity style={styles.hireButton}>
            <Text style={styles.hireButtonText}>
              Hire Now
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Jobs */}
      <Text style={styles.sectionTitle}>
        Popular Jobs
      </Text>

      {jobs.map((job) => (
        <View key={job.id} style={styles.jobCard}>
          <Text style={styles.jobTitle}>
            {job.title}
          </Text>

          <Text>{job.company}</Text>

          <Text>
            {job.duration} • {job.pay}
          </Text>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Stats */}
      <Text style={styles.sectionTitle}>
        Platform Statistics
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>500+</Text>
          <Text>Workers</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>120</Text>
          <Text>Jobs Today</Text>
        </View>
      </View>

      {/* Why Choose Us */}
      <Text style={styles.sectionTitle}>
        Why Choose Us
      </Text>

      <View style={styles.benefitCard}>
        <Text>✓ Verified Workers</Text>
        <Text>✓ Fast Hiring</Text>
        <Text>✓ Secure Payments</Text>
        <Text>✓ Flexible Scheduling</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text>Home</Text>
        <Text>Jobs</Text>
        <Text>Hire</Text>
        <Text>Messages</Text>
        <Text>Profile</Text>
      </View>
    </ScrollView>
  );
}

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Alert,
// } from "react-native";

// import styles from "./styles/AppStyles";

// export default function App() {
//   const [modalVisible, setModalVisible] = useState(false);

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [signedIn, setSignedIn] = useState(false);

//   const handleSignIn = () => {
//     Alert.alert("Success", "Signed in successfully");

//     setSignedIn(true);
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       {!signedIn ? (
//         <TouchableOpacity
//           style={styles.openButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.buttonText}>Open Sign In</Text>
//         </TouchableOpacity>
//       ) : (
//         <View style={styles.welcomeBox}>
//           <Text style={styles.welcomeText}>Hi, {username} 👋</Text>
//         </View>
//       )}

//       <Modal visible={modalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.title}>Sign In</Text>

//             <TextInput
//               placeholder="Enter Username"
//               value={username}
//               onChangeText={setUsername}
//               style={styles.input}
//             />

//             <TextInput
//               placeholder="Enter Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//             />

//             <TouchableOpacity
//               style={[
//                 styles.signInButton,
//                 !(username && password) && styles.disabledButton,
//               ]}
//               disabled={!(username && password)}
//               onPress={handleSignIn}
//             >
//               <Text style={styles.buttonText}>Sign In</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.buttonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



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
