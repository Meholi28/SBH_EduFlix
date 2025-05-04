import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CourseViewer() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch course data based on ID
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/course/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        
        const data = await response.json();
        setCourseData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [id]);
  
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
  const CourseBanner = ({ course }) => (
    <View style={styles.bannerContainer}>
      <Image 
        source={{ uri: course.thumbnail }} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerOverlay}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <TouchableOpacity onPress={() => router.push(`/instructor/${course.instructor}`)}>
          <Text style={styles.courseInstructor}>View Instructor</Text>
        </TouchableOpacity>
        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={16} color="#ccc" />
            <Text style={styles.statText}>{course.viewCount || 0} views</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart-outline" size={16} color="#E50914" />
            <Text style={styles.statText}>{course.likeCount || 0} likes</Text>
          </View>
        </View>
      </View>
    </View>
  );
  
  // Video list item component
  const VideoItem = ({ item, index }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/courseVideoPlayer/${id}/${item._id}`)}  
      style={styles.videoItem}
    >
      <View style={styles.videoNumberContainer}>
        <Text style={styles.videoNumber}>{index + 1}</Text>
      </View>
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.videoThumbnail}
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>Video</Text>
        </View>
      </View>
      <View style={styles.videoDetails}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.videoStatusContainer}>
          <View style={styles.itemFeatures}>
            {item.videoLink && (
              <View style={styles.featureTag}>
                <Ionicons name="videocam-outline" size={14} color="#fff" />
                <Text style={styles.featureText}>Video</Text>
              </View>
            )}
            {item.notesLink && (
              <View style={styles.featureTag}>
                <Ionicons name="document-text-outline" size={14} color="#fff" />
                <Text style={styles.featureText}>Notes</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading course...</Text>
      </SafeAreaView>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar barStyle="light-content" />
        <Header />
        <View style={styles.errorContent}>
          <Ionicons name="alert-circle-outline" size={64} color="#E50914" />
          <Text style={styles.errorTitle}>Error Loading Course</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // If course data is available, render the course
  if (!courseData) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <FlatList
        data={courseData.videos || []}
        keyExtractor={(item, index) => item._id || `video-${index}`}
        renderItem={VideoItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <CourseBanner course={courseData} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>About this course</Text>
              <Text style={styles.descriptionText}>{courseData.description}</Text>
              {courseData.tags && courseData.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {courseData.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Course Content</Text>
              <Text style={styles.videoCount}>{courseData.videos?.length || 0} videos</Text>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Ionicons name="videocam-off-outline" size={48} color="#666" />
            <Text style={styles.emptyListText}>No videos available</Text>
          </View>
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
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  errorMessage: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    backgroundColor: '#E50914',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    color: '#4CAF50',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 4,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: '#1e1e1e',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  tag: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#4CAF50',
    fontSize: 12,
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
    flexGrow: 1,
  },
  emptyList: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
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
  itemFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
  },
  featureText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  }
});