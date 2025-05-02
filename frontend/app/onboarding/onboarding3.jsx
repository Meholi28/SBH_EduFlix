import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

const Onboarding3 = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>EduFlix</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.headerAction}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>All Set for Success</Text>
          <Text style={styles.subtitle}>Powerful features to accelerate your learning journey</Text>
        </View>
      
        <View style={styles.featureContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📚</Text>
              </View>
              <View style={styles.featureIconGlow} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart AI Lessons</Text>
              <Text style={styles.featureText}>Adaptive content that evolves with your progress and personalizes to your learning style</Text>
            </View>
          </View>
          
          <View style={[styles.divider, { width: width * 0.75, alignSelf: 'center' }]} />
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <View style={[styles.featureIcon, { backgroundColor: '#1d1d1d' }]}>
                <Text style={styles.featureIconText}>🎯</Text>
              </View>
              <View style={styles.featureIconGlow} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Advanced Progress Tracking</Text>
              <Text style={styles.featureText}>Visualize your growth with detailed analytics and achievement milestones</Text>
            </View>
          </View>
          
          <View style={[styles.divider, { width: width * 0.75, alignSelf: 'center' }]} />
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <View style={[styles.featureIcon, { backgroundColor: '#1d1d1d' }]}>
                <Text style={styles.featureIconText}>🏆</Text>
              </View>
              <View style={styles.featureIconGlow} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Earn & Redeem Rewards</Text>
              <Text style={styles.featureText}>Stay motivated with achievements and unlock exclusive content as you learn</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.buttonText}>Begin Your Journey</Text>
          </TouchableOpacity>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDotActive} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Onboarding3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: "#e50914",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerAction: {
    color: "#bbb",
    fontSize: 16,
    fontWeight: "600",
  },
  titleSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
    marginTop: 20,
  },
  mainTitle: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    lineHeight: 22,
  },
  featureContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featureItem: {
    marginVertical: 15,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  featureIconContainer: {
    position: 'relative',
    marginRight: 15,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e50914",
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 2,
  },
  featureIconGlow: {
    position: 'absolute',
    width: 56,
    height: 10,
    bottom: -5,
    left: 0,
    backgroundColor: 'rgba(229, 9, 20, 0.15)',
    borderRadius: 10,
    zIndex: 1,
  },
  featureIconText: {
    fontSize: 26,
  },
  featureContent: {
    flex: 1,
    paddingVertical: 5,
  },
  featureTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  featureText: {
    color: "#bbb",
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 15,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 'auto',
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#e50914",
    paddingVertical: 16,
    borderRadius: 30,
    width: width * 0.85,
    alignItems: "center",
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginHorizontal: 5,
  },
  progressDotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e50914",
    marginHorizontal: 5,
  },
});