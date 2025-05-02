// app/(auth)/signup.js
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(null);
  const [domain, setDomain] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Format date to display in the input field
  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async () => {
    if (!username || !email || !password || !date) {
      return Alert.alert("Error", "Please fill in all required fields.");
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Error", "Please enter a valid email address.");
    }
    
    // Password validation (at least 8 characters)
    if (password.length < 8) {
      return Alert.alert("Error", "Password must be at least 8 characters long.");
    }
    
    setLoading(true);
    
    try {
      const response = await fetch("http://<your-backend-url>/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          email, 
          password, 
          dob: formatDate(date), 
          domain 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Alert.alert(
          "Success", 
          "Account created successfully!",
          [{ text: "Log In Now", onPress: () => router.push("/(auth)/login") }]
        );
      } else {
        Alert.alert("Signup failed", data.message || "Try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network error", "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>EduFlix</Text>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>Start streaming educational content today</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons 
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#888" 
                />
              </TouchableOpacity>
            </View>

            <Pressable style={styles.inputContainer} onPress={toggleDatePicker}>
              <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
              <Text style={[styles.input, !date && styles.placeholderText]}>
                {date ? formatDate(date) : "Date of Birth"}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}

            <View style={styles.inputContainer}>
              <Ionicons name="globe-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Domain (class 10 / B.tech / etc.) "
                placeholderTextColor="#aaa"
                value={domain}
                onChangeText={setDomain}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.buttonText}>Creating Account...</Text>
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By signing up, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.routeText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    color: "#e50914",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  inputIcon: {
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  placeholderText: {
    color: "#aaa",
  },
  button: {
    backgroundColor: "#e50914",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#661a1e",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  termsContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  termsText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
  termsLink: {
    color: "#e50914",
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    color: "#aaa",
    fontSize: 16,
  },
  routeText: {
    color: "#e50914",
    fontSize: 16,
    fontWeight: "bold",
  },
});