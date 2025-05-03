import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SocialScreen() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      content: "Just completed the Advanced React course! 🚀",
      type: "text",
      likes: 24,
      comments: 8,
      timestamp: "2h ago",
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      content: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
      type: "image",
      caption: "My first React Native app! #coding #reactnative",
      likes: 42,
      comments: 12,
      timestamp: "5h ago",
    },
    {
      id: "3",
      user: {
        name: "Emma Davis",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      content: "Earned the 'JavaScript Master' badge! 🏆",
      type: "badge",
      badgeIcon: "trophy",
      likes: 36,
      comments: 5,
      timestamp: "1d ago",
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      content: newPost,
      type: "text",
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const PostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>

      <View style={styles.postContent}>
        {item.type === "text" && (
          <Text style={styles.postText}>{item.content}</Text>
        )}
        {item.type === "image" && (
          <View>
            <Image
              source={{ uri: item.content }}
              style={styles.postImage}
              resizeMode="cover"
            />
            {item.caption && (
              <Text style={styles.caption}>{item.caption}</Text>
            )}
          </View>
        )}
        {item.type === "badge" && (
          <View style={styles.badgeContainer}>
            <FontAwesome5 name={item.badgeIcon} size={40} color="#E50914" />
            <Text style={styles.badgeText}>{item.content}</Text>
          </View>
        )}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.replace("home")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.logo}>EduFlix</Text>
        <Text style={styles.title}>Social</Text>
      </View>

      <View style={styles.createPost}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/2.jpg" }}
          style={styles.avatar}
        />
        <TextInput
          style={styles.postInput}
          placeholder="Share your achievement..."
          placeholderTextColor="#888"
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePost}
          disabled={!newPost.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={newPost.trim() ? "#E50914" : "#888"}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    marginRight: 10,
  },
  logo: {
    color: "#E50914",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  createPost: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#1a1a1a",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
  },
  postButton: {
    padding: 8,
  },
  postsList: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: "#1a1a1a",
    marginBottom: 15,
    padding: 15,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    color: "#888",
    fontSize: 12,
  },
  postContent: {
    marginBottom: 15,
  },
  postText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  caption: {
    color: "#fff",
    fontSize: 14,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 15,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    color: "#fff",
    marginLeft: 5,
  },
}); 