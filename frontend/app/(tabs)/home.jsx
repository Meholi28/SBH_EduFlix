import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const allCourses = [
    {
      title: "Continue Watching",
      images: [
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      ],
    },
    {
      title: "Popular Courses",
      images: [
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        "https://images.unsplash.com/photo-1595617795501-9661aafda72a",
      ],
    },
    {
      title: "New Releases",
      images: [
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f",
      ],
    },
    {
      title: "Recommended For You",
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      ],
    },
  ];

  // Example basic filter logic for search (just matches titles here)
  const filteredCourses = allCourses.filter((section) =>
    section.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <Text style={styles.logo}>EduFlix</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.profilePlaceholder}>
            <Text style={styles.profileInitial}>A</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e",
          }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <Text style={styles.bannerTitle}>AI for Beginners</Text>
        <Text style={styles.bannerSubtitle}>Your journey starts here!</Text>
      </View>

      {/* Course Sections */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCourses.map((section, idx) => (
          <CourseRow key={idx} title={section.title} images={section.images} />
        ))}
      </ScrollView>
    </View>
  );
}

function CourseRow({ title, images }) {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.courseRow}
      >
        {images.map((imageUrl, id) => (
          <TouchableOpacity key={id} style={styles.courseCard}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.courseImage}
              resizeMode="cover"
            />
            <Text style={styles.courseTitle}>Course {id + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  logo: {
    color: "#E50914",
    fontSize: 28,
    fontWeight: "bold",
  },
  profilePlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#fff",
    fontWeight: "bold",
  },
  banner: {
    margin: 20,
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  bannerSubtitle: {
    color: "#ccc",
    fontSize: 16,
  },
  rowContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  courseRow: {
    paddingLeft: 10,
  },
  courseCard: {
    width: 140,
    marginHorizontal: 10,
  },
  courseImage: {
    width: 140,
    height: 90,
    borderRadius: 6,
    overflow: "hidden",
  },
  courseTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 14,
    width: 140,
    marginHorizontal: 10,
  },
});
