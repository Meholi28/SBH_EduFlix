import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
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

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Jane Smith</Text>
        <Text style={styles.title}>AI & Software Engineering Tutor</Text>
        <View style={styles.ratingContainer}>
          {[...Array(4)].map((_, i) => (
            <Ionicons key={i} name="star" size={20} color="#E50914" />
          ))}
          <Ionicons name="star-half" size={20} color="#E50914" />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.actionButton}>
            <Ionicons name="chatbubbles-outline" size={18} color="#fff" />
            <Text style={styles.actionText}>Message</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="calendar-outline" size={18} color="#fff" />
            <Text style={styles.actionText}>Book</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Courses by Jane</Text>
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
    backgroundColor: "#000", // Netflix-style black
    paddingHorizontal: 16,
    paddingTop: 40,
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
  profileContainer: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#1F1F1F",
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#E50914",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 6,
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#E50914",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    paddingLeft: 4,
  },
  courseList: {
    paddingLeft: 4,
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    marginRight: 12,
    borderRadius: 8,
    width: screenWidth * 0.6,
    justifyContent: "center",
  },
  courseTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
