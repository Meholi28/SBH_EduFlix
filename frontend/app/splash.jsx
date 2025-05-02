import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  StatusBar,
  Platform 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const backgroundFade = useRef(new Animated.Value(0)).current;
  const sparkleOpacity1 = useRef(new Animated.Value(0)).current;
  const sparkleOpacity2 = useRef(new Animated.Value(0)).current;
  const sparkleOpacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Fade in background
      Animated.timing(backgroundFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      
      // Logo appears and scales up
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      
      // Sparkle animations (staggered)
      Animated.stagger(200, [
        Animated.timing(sparkleOpacity1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleOpacity2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleOpacity3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      
      // Text fade in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Move to next screen after animation completes
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Continuous sparkle animations
  useEffect(() => {
    const sparkleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleOpacity1, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleOpacity1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    const sparkleAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleOpacity2, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleOpacity2, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    const sparkleAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleOpacity3, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleOpacity3, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    // Start loop animations after initial animation sequence
    setTimeout(() => {
      sparkleAnimation.start();
      sparkleAnimation2.start();
      sparkleAnimation3.start();
    }, 2500);

    return () => {
      sparkleAnimation.stop();
      sparkleAnimation2.stop();
      sparkleAnimation3.stop();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: backgroundFade }]}>
      <StatusBar hidden />
      
      {/* Logo container with sparkles */}
      <View style={styles.logoContainer}>
        {/* Main logo */}
        <Animated.View 
          style={[
            styles.logo, 
            { 
              opacity: logoOpacity, 
              transform: [{ scale: logoScale }] 
            }
          ]}
        >
          <Text style={styles.logoText}>E</Text>
        </Animated.View>
        
        {/* Sparkles */}
        <Animated.View 
          style={[
            styles.sparkle, 
            styles.sparkle1, 
            { opacity: sparkleOpacity1 }
          ]} 
        />
        <Animated.View 
          style={[
            styles.sparkle, 
            styles.sparkle2, 
            { opacity: sparkleOpacity2 }
          ]} 
        />
        <Animated.View 
          style={[
            styles.sparkle, 
            styles.sparkle3, 
            { opacity: sparkleOpacity3 }
          ]} 
        />
      </View>
      
      {/* App name */}
      <Animated.View style={{ opacity: textOpacity }}>
        <Text style={styles.appName}>EduFlix</Text>
        <Text style={styles.tagline}>The Netflix of Learning</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Netflix-like dark background
    padding: 20,
  },
  logoContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: '#E50914', // Netflix red
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  appName: {
    color: '#E50914',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 10,
    textShadowColor: 'rgba(229, 9, 20, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  tagline: {
    color: '#E6E6E6',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },
  sparkle: {
    position: 'absolute',
    backgroundColor: 'white',
  },
  sparkle1: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    top: 15,
    right: 15,
  },
  sparkle2: {
    width: 10,
    height: 10,
    borderRadius: 5,
    bottom: 25,
    right: 20,
  },
  sparkle3: {
    width: 8,
    height: 8,
    borderRadius: 4,
    top: 40,
    left: 15,
  },
});

export default SplashScreen;

// Usage example in your app:
/*
import SplashScreen from './SplashScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <MainApp />
      )}
    </>
  );
};
*/