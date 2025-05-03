import React, { useState, useEffect } from 'react';
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
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

export default function VideoPlayer() {
  const router = useRouter();
  const {course ,  id  } = useLocalSearchParams();
  
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [videoRef, setVideoRef] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});
  const [progress, setProgress] = useState(0);

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/course/${course}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        
        const data = await response.json();
        setCourseData(data);
        
        // Set current video based on videoId or default to first video
        const selectedVideoIndex = id ? 
          data.videos.findIndex(video => video._id === id) : 0;
        
        if (selectedVideoIndex >= 0) {
          setCurrentVideo(data.videos[selectedVideoIndex]);
        } else {
          // If no matching video is found, use the first video
          setCurrentVideo(data.videos[0]);
        }
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [course, id]);

  // Calculate video duration in mm:ss format
  const formatTime = (milliseconds) => {
    if (!milliseconds) return '00:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle video play state
  const togglePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pauseAsync();
      } else {
        videoRef.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
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
      // Create dummy notes based on current video title
      const dummyNotes = [
        {
          id: '1',
          title: `Key Concepts of ${currentVideo?.title}`,
          content: '• This is an automatically generated summary.\n• It would contain key points from the video.\n• In a real implementation, this would use AI to generate content based on the video.'
        },
        {
          id: '2',
          title: 'Important Formulas',
          content: '• Formula 1: E = mc²\n• Formula 2: F = ma\n• These would be relevant formulas from the actual video content'
        },
        {
          id: '3',
          title: 'Practice Questions',
          content: '• Question 1: How does this concept apply to real-world scenarios?\n• Question 2: Explain the key differences between X and Y.\n• These questions would help reinforce learning from the video'
        }
      ];
      
      setNotes(dummyNotes);
      setGeneratingNotes(false);
      setShowNotes(true);
    }, 1500);
  };

  // Calculate next and previous videos
  const getAdjacentVideos = () => {
    if (!courseData || !currentVideo) return { nextVideo: null, prevVideo: null };
    
    const currentIndex = courseData.videos.findIndex(v => v._id === currentVideo._id);
    
    const nextVideo = currentIndex < courseData.videos.length - 1 ? 
      courseData.videos[currentIndex + 1] : null;
    
    const prevVideo = currentIndex > 0 ? 
      courseData.videos[currentIndex - 1] : null;
    
    return { nextVideo, prevVideo };
  };

  const { nextVideo, prevVideo } = getAdjacentVideos();

  // Navigate to another video
  const navigateToVideo = (video) => {
    if (video && video._id) {
      router.push(`/courseVideoPlayer/${course}/${video._id}`);
    }
  };

  // Handle video playback status update
  const onPlaybackStatusUpdate = (status) => {
    setVideoStatus(status);
    
    if (status.isLoaded && status.durationMillis > 0) {
      setProgress((status.positionMillis / status.durationMillis) * 100);
    }
    
    // Update playing state
    setIsPlaying(status.isPlaying);
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading video...</Text>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#E50914" />
        <Text style={styles.errorText}>Failed to load video</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // No video available state
  if (!currentVideo) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="videocam-off-outline" size={64} color="#E50914" />
        <Text style={styles.errorText}>No video available</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Header component with back button
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>{courseData?.title || 'Video Player'}</Text>
    </View>
  );

  // Video Player component
  const VideoPlayerComponent = () => (
    <View style={styles.videoContainer}>
      <Video
        ref={ref => setVideoRef(ref)}
        source={{ uri: currentVideo.videoLink }}
        style={styles.videoPlayer}
        useNativeControls={false}
        resizeMode="contain"
        shouldPlay={false}
        isLooping={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(videoStatus.positionMillis)}</Text>
          <Text style={styles.timeText}>{formatTime(videoStatus.durationMillis)}</Text>
        </View>
      </View>
    </View>
  );

  // Video Info component
  const VideoInfo = () => (
    <View style={styles.videoInfoContainer}>
      <Text style={styles.videoTitle}>{currentVideo.title}</Text>
      <Text style={styles.videoInstructor}>{courseData?.instructor?.name || 'Instructor'}</Text>
      
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

        {currentVideo.notesLink && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push(currentVideo.notesLink)}
          >
            <Ionicons name="document-text-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>View Notes</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.videoDescription}>{courseData?.description || 'No description available.'}</Text>
    </View>
  );

  // Next Video component
  const NextPrevVideo = () => (
    <>
      {nextVideo && (
        <View style={styles.nextVideoContainer}>
          <Text style={styles.sectionTitle}>Next in this course</Text>
          <TouchableOpacity 
            style={styles.nextVideoCard}
            onPress={() => navigateToVideo(nextVideo)}
          >
            <Image 
              source={{ uri: nextVideo.thumbnail }}
              style={styles.nextVideoThumbnail}
            />
            <View style={styles.nextVideoInfo}>
              <Text style={styles.nextVideoTitle}>{nextVideo.title}</Text>
              <Text style={styles.nextVideoButton}>Next <Ionicons name="chevron-forward" size={14} /></Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {prevVideo && (
        <View style={styles.nextVideoContainer}>
          <Text style={styles.sectionTitle}>Previous video</Text>
          <TouchableOpacity 
            style={styles.nextVideoCard}
            onPress={() => navigateToVideo(prevVideo)}
          >
            <Image 
              source={{ uri: prevVideo.thumbnail }}
              style={styles.nextVideoThumbnail}
            />
            <View style={styles.nextVideoInfo}>
              <Text style={styles.nextVideoTitle}>{prevVideo.title}</Text>
              <Text style={styles.nextVideoButton}>Watch <Ionicons name="play" size={14} /></Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
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
        <NextPrevVideo />
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  errorSubtext: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
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
    backgroundColor: '#E50914',
    borderRadius: 8,
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
  videoPlayer: {
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
    flexWrap: 'wrap',
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