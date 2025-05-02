import User from "../models/UserModel.js";

export const createUser = async (req, res) => {
    try {
      const { username, email, password, dob, domain } = req.body;
  
      const newUser = new User({ username, email, password, dob, domain });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };



  export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('enrolledCourses.course');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  };
  
  // Update user by ID
  export const updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };
  
  // Delete user by ID
  export const deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  };  


  export const updateUserStreak = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const today = new Date();
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
      let lastUpdate = user.lastStreakUpdate
        ? new Date(user.lastStreakUpdate.getFullYear(), user.lastStreakUpdate.getMonth(), user.lastStreakUpdate.getDate())
        : null;
  
      // If it's the same day, no update needed
      if (lastUpdate && lastUpdate.getTime() === todayDate.getTime()) {
        return res.status(200).json({ message: 'Streak already updated today', currentStreak: user.currentStreak });
      }
  
      // If yesterday, continue the streak
      const yesterday = new Date(todayDate);
      yesterday.setDate(yesterday.getDate() - 1);
  
      if (lastUpdate && lastUpdate.getTime() === yesterday.getTime()) {
        user.currentStreak += 1;
      } else {
        // If last update was not yesterday, reset the streak
        user.currentStreak = 1;
      }
  
      // Update longest streak
      if (user.currentStreak > user.longestStreak) {
        user.longestStreak = user.currentStreak;
      }
  
      user.lastStreakUpdate = todayDate;
      await user.save();
  
      res.status(200).json({
        message: 'Streak updated',
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak
      });
    } catch (err) {
      console.error('Error updating streak:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };