import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Dummy video data - in a real app, you would fetch this based on the ID
const getVideoData = (id) => ({
  id: id,
  title: 'Using Context API for Global State',
  courseTitle: 'Complete React Native Development 123',
  instructor: 'Jane Smith',
  duration: '25:49',
  description: 'In this video, you will learn how to implement React\'s Context API to manage global state in your React Native applications. We\'ll cover creating contexts, providers, consumers, and best practices for state organization.',
  videoUrl: 'https://example.com/videos/context-api.mp4', // In a real app, this would point to your video file
  thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  progress: 67,
  nextVideo: {
    id: '9',
    title: 'Advanced Styling Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  prevVideo: {
    id: '7',
    title: 'Working with APIs and Fetch',
    thumbnail: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  }
});

// AI Summary notes
const dummyNotes = [
  {
    id: '1',
    title: 'Key Concepts of Context API',
    content: '• Context provides a way to pass data through the component tree without passing props down manually.\n• Create contexts using React.createContext() and access with useContext().\n• Context API is useful for global data like themes, user authentication, and language preferences.'
  },
  {
    id: '2',
    title: 'Setting Up Context',
    content: '• Create a context file with initial values\n• Build a provider component that wraps your app\n• Use useContext hook to access values in any component\n• Avoid prop drilling with shared state'
  },
  {
    id: '3',
    title: 'Performance Considerations',
    content: '• Context changes cause all consuming components to re-render\n• Split context into smaller, more focused providers\n• Use React.memo for components that don\'t need all context values\n• Consider using useReducer for complex state logic'
  }
];

export default function VideoPlayer() {
  const router = useRouter();
  // In a real app, get the ID from params
  const videoId = '8';
  const videoData = getVideoData(videoId);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [notes, setNotes] = useState([]);

  // Toggle video play state
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle like state
  const toggleLike = () => {
    setLiked(!liked);
  };

  // Generate AI notes with a simulated delay
  const generateNotes = () => {
    setGeneratingNotes(true);
    // Simulate API call delay
    setTimeout(() => {
      setNotes(dummyNotes);
      setGeneratingNotes(false);
      setShowNotes(true);
    }, 1500);
  };

  // Header component with back button
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>{videoData.courseTitle}</Text>
    </View>
  );

  // Video Player component
  const VideoPlayerComponent = () => (
    <View style={styles.videoContainer}>
      <Image 
        source={{ uri: videoData.thumbnail }}
        style={styles.videoThumbnail}
        resizeMode="cover"
      />
      
      {/* Play/Pause Button Overlay */}
      <TouchableOpacity 
        style={styles.playPauseButton}
        onPress={togglePlayPause}
      >
        <Ionicons 
          name={isPlaying ? "pause-circle" : "play-circle"} 
          size={72} 
          color="rgba(255,255,255,0.8)" 
        />
      </TouchableOpacity>
      
      {/* Video Controls */}
      <View style={styles.videoControls}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${videoData.progress}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>10:42</Text>
          <Text style={styles.timeText}>{videoData.duration}</Text>
        </View>
      </View>
    </View>
  );

  // Video Info component
  const VideoInfo = () => (
    <View style={styles.videoInfoContainer}>
      <Text style={styles.videoTitle}>{videoData.title}</Text>
      <Text style={styles.videoInstructor}>{videoData.instructor}</Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={toggleLike}
        >
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={24} 
            color={liked ? "#E50914" : "#fff"} 
          />
          <Text style={styles.actionButtonText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={generateNotes}
          disabled={generatingNotes}
        >
          <Ionicons name="bulb-outline" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>
            {generatingNotes ? "Generating..." : "AI Summary Notes"}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.videoDescription}>{videoData.description}</Text>
    </View>
  );

  // Next Video component
  const NextVideo = () => (
    <View style={styles.nextVideoContainer}>
      <Text style={styles.sectionTitle}>Next in this course</Text>
      <TouchableOpacity 
        style={styles.nextVideoCard}
        onPress={() => router.push(`/video/${videoData.nextVideo.id}`)}
      >
        <Image 
          source={{ uri: videoData.nextVideo.thumbnail }}
          style={styles.nextVideoThumbnail}
        />
        <View style={styles.nextVideoInfo}>
          <Text style={styles.nextVideoTitle}>{videoData.nextVideo.title}</Text>
          <Text style={styles.nextVideoButton}>Next <Ionicons name="chevron-forward" size={14} /></Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // AI Notes Modal
  const NotesModal = () => (
    <Modal
      visible={showNotes}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowNotes(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>AI Summary Notes</Text>
            <TouchableOpacity onPress={() => setShowNotes(false)}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.notesScrollView}>
            {notes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteContent}>{note.content}</Text>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.saveNotesButton}
            onPress={() => setShowNotes(false)}
          >
            <Text style={styles.saveNotesButtonText}>Save Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollView>
        <VideoPlayerComponent />
        <VideoInfo />
        <NextVideo />
      </ScrollView>
      <NotesModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playPauseButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E50914',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
  videoInfoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoInstructor: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 8,
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  videoDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  nextVideoContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  nextVideoCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  nextVideoThumbnail: {
    width: 120,
    height: 68,
  },
  nextVideoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  nextVideoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  nextVideoButton: {
    color: '#E50914',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '70%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notesScrollView: {
    flex: 1,
    marginVertical: 16,
  },
  noteCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  noteTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteContent: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  saveNotesButton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveNotesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});