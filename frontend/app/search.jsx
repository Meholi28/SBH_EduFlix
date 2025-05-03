import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCourses, setAllCourses] = useState([]); // Store all courses
  const [filteredCourses, setFilteredCourses] = useState([]); // Store filtered courses
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all courses from API
  const fetchAllCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // API endpoint to fetch all courses at once
      const url = 'https://dangerous-joellyn-ashes-1c16962c.koyeb.app/api/course';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      const data = await response.json();
      setAllCourses(data);
      setFilteredCourses(data); // Initially show all courses
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
      setAllCourses([]);
      setFilteredCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter courses based on search query
  const filterCourses = (query) => {
    if (!query || query.length < 2) {
      setFilteredCourses(allCourses);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = allCourses.filter((course) => {
      // Search in title, description, and tags
      return (
        course.title.toLowerCase().includes(lowerCaseQuery) ||
        course.description.toLowerCase().includes(lowerCaseQuery) ||
        (course.tags && 
          course.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
      );
    });

    setFilteredCourses(filtered);
  };

  // Load all courses on initial render
  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Apply filtering when search query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterCourses(searchQuery);
    }, 300); // Reduced timeout since we're not making API calls
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, allCourses]);

  // Function to render course tags
  const renderTags = (tags) => {
    if (!tags || tags.length === 0) return null;
    
    return (
      <View style={styles.tagsContainer}>
        {tags.slice(0, 2).map((tag, index) => (
          <Text key={index} style={styles.tagText}>#{tag}</Text>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            selectionColor="#E50914"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      <ScrollView style={styles.resultsContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E50914" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#E50914" />
            <Text style={styles.errorText}>Error: {error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchAllCourses}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <TouchableOpacity
              key={course._id}
              style={styles.courseItem}
              onPress={() => {
                // Navigate to course details screen
                router.push({
                  pathname: `/courseViewer/${course._id}`,
                  params: { courseId: course._id }
                });
              }}
            >
              <Image 
                source={{ uri: course.thumbnail }} 
                style={styles.courseThumbnail}
                resizeMode="cover"
              />
              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDescription} numberOfLines={2}>
                  {course.description}
                </Text>
                {renderTags(course.tags)}
                <View style={styles.courseStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="heart" size={16} color="#E50914" />
                    <Text style={styles.statText}>{course.likeCount || 0}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="eye" size={16} color="#888" />
                    <Text style={styles.statText}>{course.viewCount || 0}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : searchQuery.length > 0 ? (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search" size={48} color="#666" />
            <Text style={styles.noResultsText}>No courses found for "{searchQuery}"</Text>
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="search" size={48} color="#666" />
            <Text style={styles.emptyStateText}>
              No courses available. Pull down to refresh.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    outlineStyle: 'none',
  },
  clearButton: {
    padding: 4,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  courseThumbnail: {
    width: 100,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  courseDetails: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseDescription: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tagText: {
    color: '#E50914',
    fontSize: 12,
    marginRight: 8,
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
    color: '#888',
    fontSize: 14,
    marginLeft: 4,
  },
  noResultsContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    color: '#888',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  emptyStateContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#888',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#E50914',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#E50914',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});