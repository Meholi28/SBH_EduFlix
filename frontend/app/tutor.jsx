import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const courses = [
  { id: "1", title: "React Native for Beginners" },
  { id: "2", title: "Advanced JavaScript" },
  { id: "3", title: "Data Structures in Java" },
  { id: "4", title: "System Design Basics" },
];

const Tutor = () => {
  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#E50914" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image
        source={{
          uri: "https://via.placeholder.com/150",
        }}
        style={styles.image}
      />
      <Text style={styles.name}>Jane Smith</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={20} color="#E50914" />
        <Ionicons name="star" size={20} color="#E50914" />
        <Ionicons name="star" size={20} color="#E50914" />
        <Ionicons name="star" size={20} color="#E50914" />
        <Ionicons name="star-half" size={20} color="#E50914" />
        <Text style={styles.ratingText}>4.5</Text>
      </View>

      <Text style={styles.sectionTitle}>Courses</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );
};

export default Tutor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#E50914",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: {
    color: "#DDDDDD",
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 30,
    marginBottom: 10,
  },
  courseList: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    marginRight: 15,
    borderRadius: 12,
    width: screenWidth * 0.6,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  courseTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    color: "#E50914",
    fontSize: 16,
    marginLeft: 4,
  },
  
});
