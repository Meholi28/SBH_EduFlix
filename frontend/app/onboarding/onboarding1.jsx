import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");

const Onboarding1 = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>EduFlix</Text>
      </View>
      
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Text style={styles.placeholderText}>[ Image Placeholder ]</Text>
          <View style={styles.gradientOverlay} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Elevate Your Learning
        </Text>
        
        <Text style={styles.subtitle}>
          Discover a new way to master any subject with personalized AI-powered education
        </Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/onboarding/onboarding2")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressDotActive} />
          <View style={styles.progressDot} />
        </View>

        <TouchableOpacity style={styles.skipContainer} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  logo: {
    color: "#e50914",
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageWrapper: {
    width: width * 0.9,
    height: 280,
    borderRadius: 20,
    backgroundColor: "#111",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  placeholderText: {
    color: "#777",
    fontSize: 16,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 17,
    color: "#bbb",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#e50914",
    paddingVertical: 16,
    borderRadius: 30,
    width: width * 0.8,
    alignItems: "center",
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
  progressContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginHorizontal: 5,
  },
  progressDotActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e50914",
    marginHorizontal: 5,
  },
  skipContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
  skipText: {
    color: "#777",
    fontSize: 16,
    fontWeight: "600",
  },
});