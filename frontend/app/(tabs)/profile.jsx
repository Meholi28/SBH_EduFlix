import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const user = {
    name: "XYZ",
    email: "xyz@example.com",
    role: "student",
    joined: "Jan 2024",
    coursesCompleted: 10,
    hoursStudied: 30,
    streak: 28,
  };

  const achievements = [
    { icon: "award", title: "30-Day Streak" },
    { icon: "book-reader", title: "Frontend Master" },
    { icon: "fire", title: "10h+ Week" },
  ];

  const settingsOptions = [
    { icon: "user", label: "Edit Profile", goto: "EditProfile" },
    { icon: "cog", label: "Account Settings", goto: "AccountSettings" },
    {
      icon: "shield-alt",
      label: "Privacy & Security",
      goto: "PrivacySettings",
    },
    { icon: "bell", label: "Notifications", goto: "Notifications" },
    {
      icon: "sign-out-alt",
      label: "Log Out",
      color: "#FF3B30",
      goto: "Logout",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.name.slice(0, 2).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.coursesCompleted}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.hoursStudied}h</Text>
          <Text style={styles.statLabel}>Study Time</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Achievements Preview */}
      <View style={styles.achievementPreview}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {achievements.map((a, i) => (
            <View key={i} style={styles.achievementBadge}>
              <FontAwesome5 name={a.icon} size={24} color="#FFD700" />
              <Text style={styles.achievementText}>{a.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Settings */}
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsOptions.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.optionRow}
            onPress={() => {
              console.log(`Navigating to ${option.goto}`);
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
  header: {
    alignItems: "center",
    marginBottom: 30,
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
  achievementPreview: {
    marginBottom: 20,
  },
  achievementBadge: {
    backgroundColor: "#152154",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 12,
  },
  achievementText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
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