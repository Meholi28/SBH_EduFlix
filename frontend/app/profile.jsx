import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedNotes, setSavedNotes] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Get the user ID from AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      
      if (!userId) {
        // If no user ID, redirect to login
        Alert.alert("Session Expired", "Please login again");
        router.push("/(auth)/login");
        return;
      }

      // Fetch user data from the API
      const response = await fetch(`https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert("Error", "Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userInfo');
      
      // Navigate to login screen
      router.push("/(auth)/login");
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  const achievements = [
    { icon: "award", title: "Achievement Hunter", condition: userData?.achievements?.length > 0 },
    { icon: "book-reader", title: "Study Master", condition: userData?.totalWatchTime > 10 },
    { icon: "fire", title: `${userData?.currentStreak}+ Day Streak`, condition: userData?.currentStreak > 0 },
  ];

  const settingsOptions = [
    { icon: "user", label: "Edit Profile", goto: "EditProfile" },
    { icon: "cog", label: "Account Settings", goto: "AccountSettings" },
    { icon: "shield-alt", label: "Privacy & Security", goto: "PrivacySettings" },
    { icon: "bell", label: "Notifications", goto: "Notifications" },
    { 
      icon: "sign-out-alt", 
      label: "Log Out", 
      color: "#FF3B30", 
      goto: "Logout",
      onPress: handleLogout
    },
  ];

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} style={{color: "white", alignSelf: "start"}} onPress={()=> router.replace("home")}/>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userData?.username ? userData.username.slice(0, 2).toUpperCase() : ""}
          </Text>
        </View>
        <Text style={styles.name}>{userData?.username}</Text>
        <Text style={styles.email}>{userData?.email}</Text>
        <Text style={styles.role}>{userData?.domain || "Student"}</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level {userData?.level || 1}</Text>
        </View>
      </View>

      {/* Experience Bar */}
      <View style={styles.xpContainer}>
        <View style={styles.xpBarBackground}>
          <View 
            style={[
              styles.xpBarFill, 
              { 
                width: `${
                  userData?.nextLevelXp 
                    ? (userData.totalXp / userData.nextLevelXp) * 100 
                    : 0
                }%` 
              }
            ]} 
          />
        </View>
        <Text style={styles.xpText}>
          {userData?.totalXp || 0} / {userData?.nextLevelXp || 1000} XP
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{userData?.completedCourses || 0}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{userData?.totalWatchTime || 0}h</Text>
          <Text style={styles.statLabel}>Study Time</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{userData?.currentStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* AI Tutor Stats */}
      <View style={styles.aiTutorContainer}>
        <Text style={styles.sectionTitle}>AI Tutor Interactions</Text>
        <View style={styles.aiTutorStats}>
          <View style={styles.aiTutorStatItem}>
            <FontAwesome5 name="question-circle" size={16} color="#0A84FF" />
            <Text style={styles.aiTutorStatValue}>
              {userData?.aiTutorInteractions?.questionsAsked || 0}
            </Text>
            <Text style={styles.aiTutorStatLabel}>Questions</Text>
          </View>
          <View style={styles.aiTutorStatItem}>
            <FontAwesome5 name="lightbulb" size={16} color="#0A84FF" />
            <Text style={styles.aiTutorStatValue}>
              {userData?.aiTutorInteractions?.conceptsExplained || 0}
            </Text>
            <Text style={styles.aiTutorStatLabel}>Concepts</Text>
          </View>
          <View style={styles.aiTutorStatItem}>
            <FontAwesome5 name="tasks" size={16} color="#0A84FF" />
            <Text style={styles.aiTutorStatValue}>
              {userData?.aiTutorInteractions?.practiceSessionsCompleted || 0}
            </Text>
            <Text style={styles.aiTutorStatLabel}>Practice</Text>
          </View>
          <View style={styles.aiTutorStatItem}>
            <FontAwesome5 name="star" size={16} color="#0A84FF" />
            <Text style={styles.aiTutorStatValue}>
              {userData?.aiTutorInteractions?.personalizedRecommendations || 0}
            </Text>
            <Text style={styles.aiTutorStatLabel}>Insights</Text>
          </View>
        </View>
      </View>

      {/* Achievements Preview */}
      <View style={styles.achievementPreview}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {achievements.map((a, i) => (
            <View 
              key={i} 
              style={[
                styles.achievementBadge, 
                !a.condition && styles.achievementLocked
              ]}
            >
              <FontAwesome5 
                name={a.icon} 
                size={24} 
                color={a.condition ? "#FFD700" : "#555"} 
              />
              <Text style={[
                styles.achievementText,
                !a.condition && styles.achievementLockedText
              ]}>
                {a.title}
              </Text>
              {!a.condition && (
                <FontAwesome5 name="lock" size={12} color="#555" style={styles.lockIcon} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Course Progress */}
      <View style={styles.coursesContainer}>
        <Text style={styles.sectionTitle}>Course Progress</Text>
        <View style={styles.courseProgressCard}>
          <View style={styles.courseProgressItem}>
            <Text style={styles.courseProgressValue}>{userData?.completedCourses || 0}</Text>
            <Text style={styles.courseProgressLabel}>Completed</Text>
          </View>
          <View style={styles.courseProgressItem}>
            <Text style={styles.courseProgressValue}>{userData?.inProgressCourses || 0}</Text>
            <Text style={styles.courseProgressLabel}>In Progress</Text>
          </View>
          <View style={styles.courseProgressItem}>
            <Text style={styles.courseProgressValue}>{userData?.totalCoursesAvailable || 0}</Text>
            <Text style={styles.courseProgressLabel}>Available</Text>
          </View>
        </View>
      </View>

      {/* Liked Courses and Saved Notes Cards */}
      <View style={styles.cardsContainer}>
        {/* Liked Courses Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            console.log("Navigating to Enrolled Courses page");
          }}
        >
          <Text style={styles.cardTitle}>Enrolled Courses</Text>
          <Text style={styles.cardSubtitle}>
            {userData?.enrolledCourses?.length || 0} enrolled courses
          </Text>
        </TouchableOpacity>

        {/* Saved Notes Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            console.log("Navigating to Saved Notes page");
          }}
        >
          <Text style={styles.cardTitle}>Saved Notes</Text>
          <Text style={styles.cardSubtitle}>
            {savedNotes > 0 ? `${savedNotes} saved notes` : "0 saved notes"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsOptions.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.optionRow}
            onPress={() => {
              if (option.onPress) {
                option.onPress();
              } else {
                console.log(`Navigating to ${option.goto}`);
              }
            }}
          >
            <FontAwesome5
              name={option.icon}
              size={18}
              color={option.color || "#0A84FF"}
              style={styles.optionIcon}
            />
            <Text
              style={[
                styles.optionText,
                option.color ? { color: option.color } : {},
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A18",
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    backgroundColor: "#0A84FF",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  email: {
    color: "#8E8E93",
    fontSize: 14,
    marginTop: 4,
  },
  role: {
    color: "#32D74B",
    fontSize: 14,
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: "#172555",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#0A84FF",
  },
  levelText: {
    color: "#0A84FF",
    fontWeight: "600",
  },
  xpContainer: {
    marginBottom: 20,
  },
  xpBarBackground: {
    height: 10,
    backgroundColor: "#172555",
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: "#0A84FF",
  },
  xpText: {
    color: "#fff",
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  achievementPreview: {
    marginBottom: 20,
  },
  achievementBadge: {
    backgroundColor: "#152154",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 12,
    minWidth: 100,
  },
  achievementLocked: {
    backgroundColor: "#131B36",
    borderWidth: 1,
    borderColor: "#333",
  },
  achievementText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  achievementLockedText: {
    color: "#555",
  },
  lockIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 4,
  },
  aiTutorContainer: {
    marginBottom: 20,
  },
  aiTutorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#152154",
    borderRadius: 10,
    padding: 15,
  },
  aiTutorStatItem: {
    alignItems: 'center',
  },
  aiTutorStatValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  aiTutorStatLabel: {
    color: "#8E8E93",
    fontSize: 10,
  },
  coursesContainer: {
    marginBottom: 20,
  },
  courseProgressCard: {
    backgroundColor: "#152154",
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseProgressItem: {
    alignItems: 'center',
    flex: 1,
  },
  courseProgressValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  courseProgressLabel: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 4,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#152154",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#8E8E93",
    fontSize: 14,
    marginTop: 6,
  },
  settingsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1C2542",
  },
  optionIcon: {
    width: 28,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  
});