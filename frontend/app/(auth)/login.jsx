import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
useEffect(()=>{
    const fetchUser = async()=>{
      const userId = await AsyncStorage.getItem('userId');
      
      if (userId) {
        
        router.push("/(tabs)/home");
        return;
      }
    }

    fetchUser();
},[])
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      return Alert.alert("Error", "Please enter both email and password.");
    }

    setLoading(true);

    try {
      const response = await fetch("https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();

      if (response.ok) {
        // Store user ID in AsyncStorage
        if (data.user && data.user._id) {
          await AsyncStorage.setItem('userId', data.user._id);
          
          // Optional: store additional user info if needed
          await AsyncStorage.setItem('userInfo', JSON.stringify({
            id: data.user._id,
            email: data.user.email,
            username: data.user.username
          }));
        }

        // Navigate to home screen
        router.push('/(tabs)/home');
      } else {
        Alert.alert("Login failed", data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network error", "Unable to connect to server. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>EduFlix</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue learning</Text>
      </View>


      <View style={styles.form}>
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

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>
          

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.routeText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 24,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#e50914",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#e50914",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#661a1e",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
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