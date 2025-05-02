import mongoose from 'mongoose';


const enrolledCourseSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', 
    required: true
  },
  videosWatched: { type: Number, default: 0 },
  totalVideos: { type: Number, default: 0 },
  progressPercentage: { type: Number, default: 0 }, 
  lastAccessed: { type: Date, default: Date.now }
});



const userSchema = new mongoose.Schema({
  // Basic user info
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  domain: { type: String },

  // User stats
  level: { type: Number, default: 1 },
  totalXp: { type: Number, default: 0 },
  nextLevelXp: { type: Number, default: 1000 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },


  // Course completion metrics
  completedCourses: { type: Number, default: 0 },
  inProgressCourses: { type: Number, default: 0 },
  totalCoursesAvailable: { type: Number, default: 0 },
  completedVideos: { type: Number, default: 0 },
  totalWatchTime: { type: Number, default: 0 },

  // Weekly activity
  weeklyStudyHours: [{ type: Number }],
  weeklyVideosWatched: [{ type: Number }],

  aiTutorInteractions: {
    questionsAsked: { type: Number, default: 0 },
    conceptsExplained: { type: Number, default: 0 },
    practiceSessionsCompleted: { type: Number, default: 0 },
    personalizedRecommendations: { type: Number, default: 0 },
  },

  
  enrolledCourses: [enrolledCourseSchema],
  achievements: [
    {
      id: Number,
      title: String,
      description: String,
      progress: Number,
      icon: String,
    },
  ],
});


const User =  mongoose.model('User', userSchema);
export default User;