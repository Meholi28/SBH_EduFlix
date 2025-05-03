import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
  Pressable,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function SocialScreen() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      user: {
        name: "Meholi Jha",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        verified: true,
        level: "Pro",
      },
      content: "Just completed the Advanced React course! 🚀",
      type: "text",
      likes: 24,
      comments: 8,
      timestamp: "2h ago",
      liked: false,
    },
    {
      id: "2",
      user: {
        name: "Nilanjan Saha",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        verified: true,
        level: "Expert",
      },
      content: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
      type: "image",
      caption: "My first React Native app! #coding #reactnative",
      likes: 42,
      comments: 12,
      timestamp: "5h ago",
      liked: false,
    },
    {
      id: "3",
      user: {
        name: "Radhika",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        verified: false,
        level: "Rising Star",
      },
      content: "Earned the 'JavaScript Master' badge! 🏆",
      type: "badge",
      badgeIcon: "trophy",
      likes: 36,
      comments: 5,
      timestamp: "1d ago",
      liked: false,
    },
    {
      id: "4",
      user: {
        name: "Tanish Mita",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        verified: true,
        level: "Mentor",
      },
      content: "Just launched my new course on Advanced State Management! Check it out and let me know what you think.",
      type: "text",
      likes: 58,
      comments: 23,
      timestamp: "1d ago",
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const likePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        verified: true,
        level: "Student",
      },
      content: newPost,
      type: "text",
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      liked: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const PostItem = ({ item }) => {
    const animatedScale = useRef(new Animated.Value(1)).current;
    
    const onPressIn = () => {
      Animated.spring(animatedScale, {
        toValue: 0.98,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };
    
    const onPressOut = () => {
      Animated.spring(animatedScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View 
        style={[styles.postContainer, {
          transform: [{ scale: animatedScale }]
        }]}
      >
        <View style={styles.postHeader}>
          <View style={styles.userContainer}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.userName}>{item.user.name}</Text>
                {item.user.verified && (
                  <MaterialIcons name="verified" size={16} color="#E50914" style={styles.verifiedIcon} />
                )}
              </View>
              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>{item.user.level}</Text>
                <Text style={styles.timestampText}> • {item.timestamp}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Feather name="more-horizontal" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.postContent}>
          {item.type === "text" && (
            <Text style={styles.postText}>{item.content}</Text>
          )}
          {item.type === "image" && (
            <View>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.content }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              </View>
              {item.caption && (
                <Text style={styles.caption}>{item.caption}</Text>
              )}
            </View>
          )}
          {item.type === "badge" && (
            <View style={styles.badgeContainer}>
              <View style={styles.badgeIconContainer}>
                <FontAwesome5 name={item.badgeIcon} size={30} color="#fff" />
              </View>
              <Text style={styles.badgeText}>{item.content}</Text>
            </View>
          )}
        </View>

        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => likePost(item.id)}
          >
            <AntDesign 
              name={item.liked ? "heart" : "hearto"} 
              size={20} 
              color={item.liked ? "#E50914" : "#fff"} 
            />
            <Text style={[styles.actionText, item.liked && styles.actionTextActive]}>
              {item.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.bookmarkButton}>
            <Feather name="bookmark" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const Header = () => (
    <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
      <TouchableOpacity 
        onPress={() => router.replace("home")}
        style={styles.backButton}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.logo}>EduFlix</Text>
      <Text style={styles.title}>Social</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />

      <Animated.FlatList
        data={posts}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.createPostContainer}>
            <View style={styles.createPost}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/2.jpg" }}
                style={styles.avatarLarge}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.postInput}
                  placeholder="Share your achievement..."
                  placeholderTextColor="#888"
                  value={newPost}
                  onChangeText={setNewPost}
                  multiline
                />
              </View>
            </View>
            <View style={styles.postOptions}>
              <TouchableOpacity style={styles.postOption}>
                <Ionicons name="image-outline" size={20} color="#E50914" />
                <Text style={styles.optionText}>Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postOption}>
                <Ionicons name="videocam-outline" size={20} color="#E50914" />
                <Text style={styles.optionText}>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postOption}>
                <Ionicons name="document-outline" size={20} color="#E50914" />
                <Text style={styles.optionText}>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.postButton, !newPost.trim() && styles.postButtonDisabled]}
                onPress={handlePost}
                disabled={!newPost.trim()}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    paddingTop: Platform.OS === "ios" ? 50 : 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
    backgroundColor: "#0a0a0a",
    zIndex: 100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
  },
  logo: {
    color: "#E50914",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    marginLeft: 10,
  },
  createPostContainer: {
    backgroundColor: "#121212",
    marginBottom: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  createPost: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E50914",
  },
  inputContainer: {
    flex: 1,
    marginLeft: 15,
    borderRadius: 25,
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  postInput: {
    color: "#fff",
    fontSize: 16,
    minHeight: 40,
  },
  postOptions: {
    flexDirection: "row",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
    justifyContent: "space-between",
  },
  postOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  optionText: {
    color: "#999",
    marginLeft: 5,
    fontSize: 14,
  },
  postButton: {
    backgroundColor: "#E50914",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  postButtonDisabled: {
    backgroundColor: "#541215",
    opacity: 0.5,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  postsList: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: "#121212",
    marginBottom: 15,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#E50914",
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  verifiedIcon: {
    marginLeft: 5,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  levelText: {
    color: "#E50914",
    fontSize: 12,
    fontWeight: "500",
  },
  timestampText: {
    color: "#888",
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
  postContent: {
    marginBottom: 15,
  },
  postText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  caption: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 12,
  },
  badgeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E50914",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 16,
    flex: 1,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
    paddingTop: 15,
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },
  actionTextActive: {
    color: "#E50914",
  },
  spacer: {
    flex: 1,
  },
  bookmarkButton: {
    padding: 5,
  },
});