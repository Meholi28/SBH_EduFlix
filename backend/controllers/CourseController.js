import Course from "../models/CourseModel.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('relevantCourses');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('relevantCourses');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update course data
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Increment likes
export const likeCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Decrement likes (unlike)
export const unlikeCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.likeCount > 0) {
      course.likeCount -= 1;
      await course.save();
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Increment views
export const viewCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewVount: 1 } },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//get course by tag

export const getCoursesByTag = async (req, res) => {
    const { tag } = req.query;
  
    if (!tag) {
      return res.status(400).json({ message: "Tag is required in query parameters, e.g., /api/courses/by-tag?tag=math" });
    }
  
    try {
      const courses = await Course.find({ tags: { $in: [tag] } }).populate('relevantCourses');
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  