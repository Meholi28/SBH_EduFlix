import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [continueWatching, setContinueWatching] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };

  const fetchCourses = async () => {
    // If not refreshing, show the main loading indicator
    if (!refreshing) {
      setLoading(true);
    }
    
    try {
      // Set dummy continue watching data
      setContinueWatching({
        title: "Continue Watching",
        courses: [
          {
            id: "cw1",
            title: "Python Basics",
            imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
          },
          {
            id: "cw2",
            title: "Web Development",
            imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
          }
        ]
      });

      // Fetch popular courses
      const trendingResponse = await fetch("https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/course/trending/courses");
      const trendingData = await trendingResponse.json();
      setPopularCourses({
        title: "Popular Courses",
        courses: trendingData || []
      });
     
      // For new releases, we'll use dummy data (or you could add another endpoint)
      setNewReleases({
        title: "New Releases",
        courses: [
          {
            id: "nr1",
            title: "JavaScript 2025",
            imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb"
          },
          {
            id: "nr2",
            title: "Cybersecurity Fundamentals",
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
          },
          {
            id: "nr3",
            title: "Mobile App Development",
            imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f"
          }
        ]
      });

      // Get the latest visited course ID from AsyncStorage
      const latestVisitedCourseId = await AsyncStorage.getItem("latestVisitedCourseId");
      
      let recommendedData;
      if (latestVisitedCourseId) {
        // If we have a latest visited course, use that for recommendations
        const recResponse = await fetch(`https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/course/recommendation/${latestVisitedCourseId}`);
        recommendedData = await recResponse.json();
  
        
      } else {
        // Otherwise, get initial recommendations based on user domain
        const recResponse = await fetch("https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/course/recommendation/at/begin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userDomain: "B.Tech Information Technology"
          })
        });
        recommendedData = await recResponse.json();
       
        
      }

      setRecommendedCourses({
        title: "Recommended For You",
        courses: recommendedData.relevantCourses || []
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic for search
  const getFilteredSections = () => {
    const allSections = [continueWatching, popularCourses, newReleases, recommendedCourses];
    
    if (!search) return allSections.filter(section => section.courses && section.courses.length > 0);
    
    return allSections
      .map(section => {
        if (!section.courses) return null;
        
        // Filter courses within each section that match the search term
        const filteredCourses = section.courses.filter(course => 
          course.title.toLowerCase().includes(search.toLowerCase())
        );
        
        return filteredCourses.length > 0 ? {...section, courses: filteredCourses} : null;
      })
      .filter(Boolean); // Remove null sections
  };

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <Text style={styles.logo}>EduFlix</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={styles.searchIcon} onPress={() => router.push("search")}>
            <Ionicons name="search-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => {}}>
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profilePlaceholder} onPress={()=>router.replace("profile")}>
            <Ionicons name="person-outline" size={20} color="#fff" /> 
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E50914" />
          <Text style={styles.loadingText}>Loading courses...</Text>
        </View>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#E50914"]}
              tintColor="#E50914"
              title="Pull to refresh"
              titleColor="#fff"
            />
          }
        >
          {getFilteredSections().map((section, idx) => (
            <CourseRow 
              key={idx}
              title={section.title} 
              courses={section.courses} 
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function CourseRow({ title, courses }) {
  
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.courseRow}
      >
        {courses.map((course, id) => (
          <TouchableOpacity 
            key={course.id || id} 
            style={styles.courseCard}
            onPress={() => {
              // Store this course ID when clicked for future recommendations
              AsyncStorage.setItem("latestVisitedCourseId", course._id.toString());
              router.push(`/courseViewer/${course._id.toString()}`)
            }}
          >
            <Image
              source={{ uri: course.imageUrl || course.thumbnail}}
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
  searchIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  notificationIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
});