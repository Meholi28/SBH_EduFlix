import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Dimensions 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Course data with Unsplash images instead of placeholders
const getCourseData = (id) => ({
  id: id,
  title: `Complete React Native Development ${id}`,
  instructor: 'Jane Smith',
  totalVideos: 24,
  completedVideos: 7,
  // Course banner - tech/coding related image
  thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  description: 'Master React Native and build cross-platform mobile apps for iOS and Android',
  videos: [
    {
      id: '1',
      title: 'Introduction to React Native',
      duration: '12:34',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: true,
      progress: 100,
    },
    {
      id: '2',
      title: 'Setting Up Your Development Environment',
      duration: '18:22',
      thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: true,
      progress: 100,
    },
    {
      id: '3',
      title: 'Core Components and APIs',
      duration: '22:45',
      thumbnail: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: true,
      progress: 100,
    },
    {
      id: '4',
      title: 'Styling and Layout with Flexbox',
      duration: '19:51',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: true,
      progress: 100,
    },
    {
      id: '5',
      title: 'Navigation with Expo Router',
      duration: '28:03',
      thumbnail: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: true,
      progress: 100,
    },
    {
      id: '6',
      title: 'State Management in React Native',
      duration: '24:12',
      thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: true,
      progress: 100,
    },
    {
      id: '7',
      title: 'Working with APIs and Fetch',
      duration: '21:37',
      thumbnail: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: false,
      progress: 90,
    },
    {
      id: '8',
      title: 'Using Context API for Global State',
      duration: '25:49',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: false,
      progress: 67,
    },
    {
      id: '9',
      title: 'Advanced Styling Techniques',
      duration: '17:29',
      thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: false,
      progress: 80,
    },
    {
      id: '10',
      title: 'Animations and Transitions',
      duration: '31:08',
      thumbnail: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: false,
      progress: 20,
    },
    {
      id: '11',
      title: 'Working with Forms and User Input',
      duration: '23:15',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: false,
      progress: 0,
    },
    {
      id: '12',
      title: 'Building Custom Components',
      duration: '26:40',
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      completed: false,
      progress: 0,
    },
  ]
});

export default function CourseViewer() {
  const router = useRouter();
 
  
  // Get course data based on ID
  let id  = 123;
  const courseData = getCourseData(id);
  
  // Calculate completion percentage
  const completionPercentage = Math.round((courseData.completedVideos / courseData.totalVideos) * 100);
  
  // Header component with back button
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  
  // Banner component with course thumbnail and info
  const CourseBanner = () => (
    <View style={styles.bannerContainer}>
      <Image 
        source={{ uri: courseData.thumbnail }} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerOverlay}>
        <Text style={styles.courseTitle}>{courseData.title}</Text>
        <Text style={styles.courseInstructor} onPress={()=>router.push("/tutor")}>{courseData.instructor}</Text>
        <View style={styles.courseStats}>
          <Text style={styles.courseProgress}>
            {completionPercentage}% complete ({courseData.completedVideos}/{courseData.totalVideos} videos)
          </Text>
        </View>
      </View>
    </View>
  );
  
  // Video list item component
  const VideoItem = ({ item, index }) => (
    <TouchableOpacity onPress={()=>{router.push('/courseVideoPlayer')}}  style={styles.videoItem}>
      <View style={styles.videoNumberContainer}>
        <Text style={styles.videoNumber}>{index + 1}</Text>
      </View>
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.videoThumbnail}
        />
        {item.progress > 0 && item.progress < 100 && (
          <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
        )}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.videoDetails}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.videoStatusContainer}>
          {item.completed ? (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          ) : item.progress > 0 ? (
            <View style={styles.inProgressBadge}>
              <Ionicons name="time-outline" size={16} color="#FFC107" />
              <Text style={styles.inProgressText}>In Progress ({item.progress}%)</Text>
            </View>
          ) : (
            <Text style={styles.notStartedText}>Not started</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <FlatList
        data={courseData.videos}
        keyExtractor={item => item.id}
        renderItem={VideoItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <CourseBanner />
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Course Content</Text>
              <Text style={styles.videoCount}>{courseData.videos.length} videos</Text>
            </View>
          </>
        )}
        contentContainerStyle={styles.listContent}
      />
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseProgress: {
    fontSize: 14,
    color: '#4CAF50',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  videoCount: {
    fontSize: 14,
    color: '#999',
  },
  listContent: {
    paddingBottom: 24,
  },
  videoItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  videoNumberContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  videoNumber: {
    color: '#999',
    fontSize: 14,
  },
  thumbnailContainer: {
    position: 'relative',
    width: 120,
    height: 68,
    marginRight: 12,
    borderRadius: 4,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: '#E50914',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
  },
  videoDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  videoStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    color: '#4CAF50',
    fontSize: 12,
    marginLeft: 4,
  },
  inProgressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inProgressText: {
    color: '#FFC107',
    fontSize: 12,
    marginLeft: 4,
  },
  notStartedText: {
    color: '#999',
    fontSize: 12,
  },
});