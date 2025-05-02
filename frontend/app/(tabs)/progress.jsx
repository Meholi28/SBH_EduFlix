import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function ProgressScreen() {
  // Enhanced data with Netflix-like education metrics
  const [userData, setUserData] = useState({
    // User stats
    username: "Ashes Das",
    level: 24,
    totalXp: 12450,
    nextLevelXp: 15000,
    currentStreak: 28, // Days in a row
    longestStreak: 42,

    // Course completion metrics
    completedCourses: 7,
    inProgressCourses: 3,
    totalCoursesAvailable: 42,
    completedVideos: 178,
    totalWatchTime: 64.5, // hours

    // Weekly activity
    weeklyStudyHours: [4.5, 6.2, 5.0, 7.5, 8.0, 6.5, 5.0],
    weeklyVideosWatched: [3, 5, 4, 7, 8, 6, 4],

    // AI Tutor interaction stats
    aiTutorInteractions: {
      questionsAsked: 56,
      conceptsExplained: 38,
      practiceSessionsCompleted: 24,
      personalizedRecommendations: 15,
    },

    // Course completion data
    courseCompletionData: {
      labels: [
        "React Mastery",
        "Python Essentials",
        "Data Science",
        "UI/UX Design",
        "Node.js",
      ],
      data: [0.85, 0.65, 0.42, 0.9, 0.77],
    },

    // Skill distribution
    skillDistribution: {
      labels: [
        "Frontend",
        "Backend",
        "Mobile",
        "Data Science",
        "UI/UX",
        "DevOps",
      ],
      data: [38, 24, 15, 10, 8, 5],
    },

    // Monthly progress
    monthlyProgress: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [25, 45, 68, 92, 115, 142],
        },
      ],
    },

    // Recent activities with enhanced detail
    recentActivities: [
      {
        id: 1,
        title: "Completed 'Advanced React Hooks'",
        type: "video",
        course: "React Mastery",
        instructor: "Sarah Johnson",
        date: "Today",
        duration: "32 min",
        xp: 150,
      },
      {
        id: 2,
        title: "Mastered 'JavaScript Promises'",
        type: "quiz",
        course: "JavaScript Fundamentals",
        score: "95%",
        date: "Yesterday",
        xp: 75,
      },
      {
        id: 3,
        title: "AI Tutor Session: API Integration",
        type: "ai-session",
        concepts: ["RESTful APIs", "Authentication", "Error Handling"],
        date: "Yesterday",
        duration: "45 min",
        xp: 120,
      },
      {
        id: 4,
        title: "Coding Challenge: E-commerce Cart",
        type: "challenge",
        difficulty: "Intermediate",
        date: "Apr 27",
        xp: 200,
      },
      {
        id: 5,
        title: "Watched 'State Management in Redux'",
        type: "video",
        course: "React Mastery",
        instructor: "Sarah Johnson",
        date: "Apr 26",
        duration: "28 min",
        xp: 85,
      },
      {
        id: 6,
        title: "Study Group: React Project Planning",
        type: "collaboration",
        participants: 4,
        date: "Apr 25",
        duration: "60 min",
        xp: 150,
      },
    ],

    // Recommended next courses based on AI analysis
    recommendations: [
      {
        id: 1,
        title: "GraphQL Advanced Concepts",
        matchScore: 98,
        difficulty: "Advanced",
        duration: "4h 35m",
        enrolled: 1245,
        thumbnail: "https://example.com/graphql.jpg",
      },
      {
        id: 2,
        title: "React Native Animation Masterclass",
        matchScore: 95,
        difficulty: "Intermediate",
        duration: "3h 20m",
        enrolled: 875,
        thumbnail: "https://example.com/react-native.jpg",
      },
      {
        id: 3,
        title: "State Management with Redux Toolkit",
        matchScore: 92,
        difficulty: "Intermediate",
        duration: "2h 50m",
        enrolled: 2130,
        thumbnail: "https://example.com/redux-toolkit.jpg",
      },
    ],

    // Achievements (Netflix-like badges)
    achievements: [
      {
        id: 1,
        title: "30-Day Streak",
        description: "Study for 30 consecutive days",
        progress: 93,
        icon: "fire",
      },
      {
        id: 2,
        title: "Frontend Master",
        description: "Complete all frontend development courses",
        progress: 70,
        icon: "laptop-code",
      },
      {
        id: 3,
        title: "Quiz Wizard",
        description: "Score 100% on 5 consecutive quizzes",
        progress: 80,
        icon: "award",
      },
      {
        id: 4,
        title: "Code Marathon",
        description: "Study for more than 10 hours in a single week",
        progress: 100,
        icon: "running",
      },
    ],

    // Learning path progress (Netflix-like seasons)
    learningPath: {
      title: "Full-Stack Web Development",
      progress: 68,
      modules: [
        {
          id: 1,
          title: "Frontend Fundamentals",
          progress: 100,
          lessons: 12,
          completed: 12,
        },
        {
          id: 2,
          title: "JavaScript Deep Dive",
          progress: 100,
          lessons: 15,
          completed: 15,
        },
        {
          id: 3,
          title: "React Ecosystem",
          progress: 80,
          lessons: 20,
          completed: 16,
        },
        {
          id: 4,
          title: "Backend with Node.js",
          progress: 45,
          lessons: 18,
          completed: 8,
        },
        {
          id: 5,
          title: "Database Design",
          progress: 20,
          lessons: 10,
          completed: 2,
        },
        {
          id: 6,
          title: "Deployment & DevOps",
          progress: 0,
          lessons: 8,
          completed: 0,
        },
      ],
    },
  });

  const screenWidth = Dimensions.get("window").width - 30;

  const chartWidth = Dimensions.get("window").width - 45;

  const chartConfig = {
    backgroundGradientFrom: "#080F28",
    backgroundGradientTo: "#101D42",
    color: (opacity = 1) => `rgba(10, 132, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  const colorPalette = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#1A535C", "#FF9F1C"];

  const progressChartConfig = {
    backgroundGradientFrom: "#080F28",
    backgroundGradientTo: "#101D42",
    color: (opacity = 1, index = 0) => {
      const color = colorPalette[index % colorPalette.length];
      return `${hexToRgba(color, opacity)}`;
    },
    strokeWidth: 16,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  // Helper function to convert HEX to RGBA
  function hexToRgba(hex, opacity) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const renderActivityIcon = (type) => {
    switch (type) {
      case "video":
        return (
          <MaterialIcons name="ondemand-video" size={24} color="#0A84FF" />
        );
      case "quiz":
        return <AntDesign name="form" size={24} color="#32D74B" />;
      case "ai-session":
        return <MaterialIcons name="smart-toy" size={24} color="#BF5AF2" />;
      case "challenge":
        return <FontAwesome5 name="laptop-code" size={24} color="#FF9F0A" />;
      case "collaboration":
        return <Ionicons name="people" size={24} color="#FF375F" />;
      default:
        return <AntDesign name="star" size={24} color="#0A84FF" />;
    }
  };

  const getLevelProgress = () => {
    return (userData.totalXp / userData.nextLevelXp) * 100;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header with Level and Streak */}
      <View style={styles.profileHeader}>
        <View style={styles.profileLeft}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>AC</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{userData.level}</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{userData.username}</Text>
            <View style={styles.levelProgressContainer}>
              <View
                style={[
                  styles.levelProgressBar,
                  { width: `${getLevelProgress()}%` },
                ]}
              />
              <Text style={styles.levelProgressText}>
                {userData.totalXp} / {userData.nextLevelXp} XP
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.streakContainer}>
          <FontAwesome5 name="fire" size={24} color="#FF9500" />
          <Text style={styles.streakCount}>{userData.currentStreak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="videocam" size={22} color="#0A84FF" />
          <Text style={styles.statValue}>{userData.completedVideos}</Text>
          <Text style={styles.statLabel}>Videos</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time" size={22} color="#32D74B" />
          <Text style={styles.statValue}>{userData.totalWatchTime}h</Text>
          <Text style={styles.statLabel}>Watch Time</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="smart-toy" size={22} color="#BF5AF2" />
          <Text style={styles.statValue}>
            {userData.aiTutorInteractions.questionsAsked}
          </Text>
          <Text style={styles.statLabel}>AI Sessions</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome5 name="book" size={20} color="#FF9F0A" />
          <Text style={styles.statValue}>{userData.completedCourses}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
      </View>

      {/* Continue Learning Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {userData.learningPath.modules
            .filter((m) => m.progress > 0 && m.progress < 100)
            .map((module) => (
              <TouchableOpacity key={module.id} style={styles.courseCard}>
                <View style={styles.courseCardHeader}>
                  <FontAwesome5 name="react" size={24} color="#0A84FF" />
                  <View style={styles.courseProgressBadge}>
                    <Text style={styles.courseProgressText}>
                      {module.progress}%
                    </Text>
                  </View>
                </View>
                <Text style={styles.courseTitle}>{module.title}</Text>
                <View style={styles.courseProgressBar}>
                  <View
                    style={[
                      styles.courseProgress,
                      { width: `${module.progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.courseStats}>
                  {module.completed}/{module.lessons} lessons
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* AI Tutor Stats */}
      <View style={styles.aiTutorContainer}>
        <View style={styles.aiTutorHeader}>
          <View style={styles.aiTutorIcon}>
            <MaterialIcons name="smart-toy" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.aiTutorTitle}>Your AI Tutor Sessions</Text>
        </View>

        <View style={styles.aiTutorStats}>
          <View style={styles.aiTutorStat}>
            <Text style={styles.aiStatValue}>
              {userData.aiTutorInteractions.questionsAsked}
            </Text>
            <Text style={styles.aiStatLabel}>Questions Asked</Text>
          </View>
          <View style={styles.aiTutorStat}>
            <Text style={styles.aiStatValue}>
              {userData.aiTutorInteractions.conceptsExplained}
            </Text>
            <Text style={styles.aiStatLabel}>Concepts Explained</Text>
          </View>
          <View style={styles.aiTutorStat}>
            <Text style={styles.aiStatValue}>
              {userData.aiTutorInteractions.practiceSessionsCompleted}
            </Text>
            <Text style={styles.aiStatLabel}>Practice Sessions</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.aiTutorButton}>
          <Text style={styles.aiTutorButtonText}>
            Start New AI Tutor Session
          </Text>
        </TouchableOpacity>
      </View>

      {/* Learning Path Progress */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Learning Path: {userData.learningPath.title}
          </Text>
          <Text style={styles.progressPercentage}>
            {userData.learningPath.progress}%
          </Text>
        </View>

        <View style={styles.learningPathContainer}>
          {userData.learningPath.modules.map((module, index) => (
            <TouchableOpacity key={module.id} style={styles.pathModule}>
              <View
                style={[
                  styles.moduleIcon,
                  module.progress === 100
                    ? styles.moduleCompleted
                    : module.progress > 0
                    ? styles.moduleInProgress
                    : styles.moduleNotStarted,
                ]}
              >
                <Text style={styles.moduleNumber}>{index + 1}</Text>
              </View>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleName}>{module.title}</Text>
                <View style={styles.moduleProgressContainer}>
                  <View
                    style={[
                      styles.moduleProgressBar,
                      { width: `${module.progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.moduleProgressText}>
                  {module.completed}/{module.lessons} lessons completed
                </Text>
              </View>
              <MaterialIcons
                name={
                  module.progress === 100 ? "check-circle" : "chevron-right"
                }
                size={24}
                color={module.progress === 100 ? "#32D74B" : "#8E8E93"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Weekly Activity */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Study Activity</Text>
        <BarChart
          data={{
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            datasets: [
              {
                data: userData.weeklyStudyHours,
              },
            ],
            barColors: [
              "#FF6B6B", // Mon
              "#4ECDC4", // Tue
              "#FFD93D", // Wed
              "#1A535C", // Thu
              "#FF9F1C", // Fri
              "#5F27CD", // Sat
              "#00D2D3", // Sun
            ],
          }}
          width={chartWidth}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
          showBarTops={false}
          fromZero
          withCustomBarColorFromData={true}
        />

        <View style={styles.weeklyStatsRow}>
          <View style={styles.weeklyStat}>
            <Text style={styles.weeklyStatValue}>
              {userData.weeklyStudyHours.reduce((a, b) => a + b, 0).toFixed(1)}h
            </Text>
            <Text style={styles.weeklyStatLabel}>Total Study Time</Text>
          </View>
          <View style={styles.weeklyStat}>
            <Text style={styles.weeklyStatValue}>
              {userData.weeklyVideosWatched.reduce((a, b) => a + b, 0)}
            </Text>
            <Text style={styles.weeklyStatLabel}>Videos Watched</Text>
          </View>
          <View style={styles.weeklyStat}>
            <Text style={styles.weeklyStatValue}>
              {Math.max(...userData.weeklyStudyHours).toFixed(1)}h
            </Text>
            <Text style={styles.weeklyStatLabel}>Best Day</Text>
          </View>
        </View>
      </View>

      {/* Course Completion Progress Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Course Completion</Text>
        <ProgressChart
          data={userData.courseCompletionData}
          width={chartWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={progressChartConfig}
          hideLegend={true}
        />
        <View style={styles.customLegend}>
          {userData.courseCompletionData.labels.map((label, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColorBox,
                  {
                    backgroundColor: progressChartConfig.color(
                      index / userData.courseCompletionData.labels.length,
                      1
                    ),
                  },
                ]}
              />
              <Text style={styles.legendLabel}>
                {label} -{" "}
                {(userData.courseCompletionData.data[index] * 100).toFixed(0)}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Skill Distribution */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Your Skill Distribution</Text>
        <PieChart
          data={userData.skillDistribution.labels.map((label, index) => ({
            name: label,
            population: userData.skillDistribution.data[index],
            color: [
              "#0A84FF",
              "#32D74B",
              "#FF9F0A",
              "#BF5AF2",
              "#FF375F",
              "#64D2FF",
            ][index],
            legendFontColor: "#FFFFFF",
            legendFontSize: 12,
          }))}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Monthly Learning Progress */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly XP Progress</Text>
        <LineChart
          data={userData.monthlyProgress}
          width={chartWidth}
          height={200}
          chartConfig={{
            ...chartConfig,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#101D42",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Recommendations Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {userData.recommendations.map((course) => (
            <TouchableOpacity key={course.id} style={styles.recommendationCard}>
              <View style={styles.recommendationThumbnail}>
                <AntDesign name="play" size={36} color="#FFFFFF" />
              </View>
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{course.matchScore}% match</Text>
              </View>
              <Text style={styles.recommendationTitle}>{course.title}</Text>
              <View style={styles.recommendationDetails}>
                <Text style={styles.recommendationDifficulty}>
                  {course.difficulty}
                </Text>
                <Text style={styles.recommendationDot}>•</Text>
                <Text style={styles.recommendationDuration}>
                  {course.duration}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activities Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {userData.recentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              {renderActivityIcon(activity.type)}
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <View style={styles.activityMetaRow}>
                {activity.course && (
                  <Text style={styles.activityMeta}>{activity.course}</Text>
                )}
                {activity.duration && (
                  <>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.activityMeta}>{activity.duration}</Text>
                  </>
                )}
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
              </View>
            </View>
            <View style={styles.activityXp}>
              <Text style={styles.activityXpText}>+{activity.xp}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Achievements Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {userData.achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View
                style={[
                  styles.achievementIconContainer,
                  achievement.progress === 100
                    ? styles.achievementCompleted
                    : styles.achievementInProgress,
                ]}
              >
                <FontAwesome5
                  name={achievement.icon}
                  size={32}
                  color={achievement.progress === 100 ? "#FFFFFF" : "#0A84FF"}
                />
              </View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDesc}>
                {achievement.description}
              </Text>
              <View style={styles.achievementProgressContainer}>
                <View
                  style={[
                    styles.achievementProgress,
                    { width: `${achievement.progress}%` },
                  ]}
                />
              </View>
              <Text style={styles.achievementProgressText}>
                {achievement.progress}%
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A18",
    padding: 15,
  },

  // Profile Header
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginRight: 50,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0A84FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    position: "relative",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  levelBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#32D74B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#050A18",
  },
  levelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  levelProgressContainer: {
    height: 6,
    backgroundColor: "#1C2542",
    borderRadius: 3,
    width: "100%",
    position: "relative",
  },
  levelProgressBar: {
    height: "100%",
    backgroundColor: "#32D74B",
    borderRadius: 3,
  },
  levelProgressText: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 4,
  },
  streakContainer: {
    alignItems: "center",
  },
  streakCount: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  streakLabel: {
    color: "#8E8E93",
    fontSize: 12,
  },

  // Stats Row
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#101D42",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  statLabel: {
    color: "#8E8E93",
    fontSize: 11,
  },

  // Section Container
  sectionContainer: {
    backgroundColor: "#101D42",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  progressPercentage: {
    color: "#0A84FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAllButton: {
    padding: 5,
  },
  seeAllText: {
    color: "#0A84FF",
    fontSize: 14,
  },

  // Horizontal Scroll
  horizontalScroll: {
    flexDirection: "row",
    marginLeft: -5,
    marginRight: -5,
  },

  // Course Cards
  courseCard: {
    width: 160,
    backgroundColor: "#152154",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 8,
  },
  courseCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  courseProgressBadge: {
    backgroundColor: "#0A84FF20",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  courseProgressText: {
    color: "#0A84FF",
    fontSize: 12,
    fontWeight: "bold",
  },
  courseTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    height: 40,
  },
  courseProgressBar: {
    height: 4,
    backgroundColor: "#1C2542",
    borderRadius: 2,
    marginBottom: 8,
  },
  courseProgress: {
    height: "100%",
    backgroundColor: "#0A84FF",
    borderRadius: 2,
  },
  courseStats: {
    color: "#8E8E93",
    fontSize: 12,
  },

  // AI Tutor Container
  aiTutorContainer: {
    backgroundColor: "#101D42",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  aiTutorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  aiTutorIcon: {
    backgroundColor: "#BF5AF2",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  aiTutorTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  aiTutorStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  aiTutorStat: {
    flex: 1,
    alignItems: "center",
  },
  aiStatValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  aiStatLabel: {
    color: "#8E8E93",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
  aiTutorButton: {
    backgroundColor: "#BF5AF2",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 5,
  },
  aiTutorButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Learning Path
  learningPathContainer: {
    marginTop: 5,
  },
  pathModule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#152154",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  moduleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  moduleCompleted: {
    backgroundColor: "#32D74B",
  },
  moduleInProgress: {
    backgroundColor: "#0A84FF",
  },
  moduleNotStarted: {
    backgroundColor: "#3A3A3C",
  },
  moduleNumber: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  moduleInfo: {
    flex: 1,
  },
  moduleName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  moduleProgressContainer: {
    height: 4,
    backgroundColor: "#1C2542",
    borderRadius: 2,
    marginBottom: 5,
  },
  moduleProgressBar: {
    height: "100%",
    backgroundColor: "#0A84FF",
    borderRadius: 2,
  },
  moduleProgressText: {
    color: "#8E8E93",
    fontSize: 12,
  },

  // Chart Container
  chartContainer: {
    backgroundColor: "#101D42",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  chart: {
    borderRadius: 16,
    //marginHorizontal: -8,
  },
  weeklyStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  weeklyStat: {
    flex: 1,
    alignItems: "center",
  },
  weeklyStatValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  weeklyStatLabel: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 2,
  },
  customLegend: {
    marginTop: 12,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    marginRight: 8,
    borderRadius: 2,
  },
  legendLabel: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  // Recommendation Cards
  recommendationCard: {
    width: 220,
    marginHorizontal: 8,
  },
  recommendationThumbnail: {
    height: 124,
    backgroundColor: "#152154",
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  matchBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(10, 132, 255, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  matchText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  recommendationTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  recommendationDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  recommendationDifficulty: {
    color: "#8E8E93",
    fontSize: 12,
  },
  recommendationDot: {
    color: "#8E8E93",
    fontSize: 12,
    marginHorizontal: 5,
  },
  recommendationDuration: {
    color: "#8E8E93",
    fontSize: 12,
  },

  // Activity Items
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1C2542",
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#152154",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 3,
  },
  activityMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityMeta: {
    color: "#8E8E93",
    fontSize: 12,
  },
  metaDot: {
    color: "#8E8E93",
    fontSize: 12,
    marginHorizontal: 5,
  },
  activityDate: {
    color: "#8E8E93",
    fontSize: 12,
  },
  activityXp: {
    backgroundColor: "rgba(10, 132, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    justifyContent: "center",
  },
  activityXpText: {
    color: "#0A84FF",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Achievement Cards
  achievementCard: {
    width: 150,
    backgroundColor: "#152154",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 8,
    alignItems: "center",
  },
  achievementIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  achievementCompleted: {
    backgroundColor: "#32D74B",
  },
  achievementInProgress: {
    backgroundColor: "rgba(10, 132, 255, 0.2)",
    borderWidth: 2,
    borderColor: "#0A84FF",
  },
  achievementTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  achievementDesc: {
    color: "#8E8E93",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    height: 32,
  },
  achievementProgressContainer: {
    height: 4,
    backgroundColor: "#1C2542",
    borderRadius: 2,
    width: "100%",
    marginBottom: 5,
  },
  achievementProgress: {
    height: "100%",
    backgroundColor: "#0A84FF",
    borderRadius: 2,
  },
  achievementProgressText: {
    color: "#8E8E93",
    fontSize: 12,
  },
});
