import { useRouter } from "expo-router";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function CoursesScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  
  const handleViewAllTrendingFree = () => {
    console.log("Navigate to: All Trending Free Courses");
  };
  
  const handleViewAllTrendingPaid = () => {
    console.log("Navigate to: All Trending Paid Courses");
  };
  
  const handleViewAllRecommended = () => {
    console.log("Navigate to: All Recommended Courses");
  };

  // Course data with images
  const trendingFreeCourses = [
    {
      title: "AI Basics",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      title: "Intro to Python",
      image: "https://miro.medium.com/v2/resize:fit:1400/1*l8gJIza6uuj84EyWl0OjSQ.jpeg"
    },
    {
      title: "Web Dev Starter",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    }
  ];
  
  const trendingPaidCourses = [
    {
      title: "ML with Projects",
      image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      title: "Advanced React Native",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      title: "UI/UX Bootcamp",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    }
  ];
  
  const recommendedCourses = [
    {
      title: "Ethical Hacking",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      title: "Chatbot Development",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      title: "Career Skills 101",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    }
  ];
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for courses..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      
      {/* Trending Courses */}
      <CourseSection
        title="▶️ Trending (Free)"
        courses={trendingFreeCourses}
        onViewAll={handleViewAllTrendingFree}
      />
      
      <CourseSection
        title="👑 Trending (Paid)"
        courses={trendingPaidCourses}
        onViewAll={handleViewAllTrendingPaid}
      />
      
      {/* Recommended Courses */}
      <CourseSection
        title="⭐ Recommended for You"
        courses={recommendedCourses}
        onViewAll={handleViewAllRecommended}
      />
    </ScrollView>
  );
}

function CourseSection({ title, courses, onViewAll }) {
  // Use React Navigation's navigation hook instead of Expo Router
  const navigation = useNavigation();
  
  const handleCoursePress = (course) => {
    try {
      // Use React Navigation's navigate method since you're using Tab Navigator
      navigation.navigate("courseViewer", { 
        course: course 
      });
      console.log(`Navigating to profile with course: ${course.title}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {courses.map((course, index) => (
          <TouchableOpacity 
            onPress={() => handleCoursePress(course)} 
            key={index} 
            style={styles.courseCard}
          >
            <Image 
              source={{ uri: course.image }} 
              style={styles.courseImage}
              resizeMode="cover"
            />
            <Text style={styles.courseTitle}>{course.title}</Text>
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
    paddingTop: 60,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#fff",
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  viewAllText: {
    color: "#E50914",
    fontSize: 14,
    fontWeight: "500",
  },
  courseCard: {
    width: 160,
    marginLeft: 20,
    marginRight: 5,
    alignItems: "center",
  },
  courseImage: {
    width: 160,
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  courseTitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});