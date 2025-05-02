import natural from 'natural';
import Course from '../models/CourseModel.js';

async function generateRelevantCourses(req, res) {
  try {
    const { courseId } = req.params;

    const currentCourse = await Course.findById(courseId);
    if (!currentCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const currentTags = currentCourse.tags.map(tag => tag.toLowerCase());
    const courses = await Course.find({ _id: { $ne: courseId } });

    const similarities = courses.map(course => {
      const courseTags = course.tags.map(tag => tag.toLowerCase());

      let totalSim = 0;
      let count = 0;

      // Compare every tag in current with every tag in this course
      for (let tagA of currentTags) {
        for (let tagB of courseTags) {
          totalSim += natural.DiceCoefficient(tagA, tagB);
          count++;
        }
      }

      const avgSim = count ? totalSim / count : 0;
      return { course, similarity: avgSim };
    });

    const relevantCourses = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(item => item.course);

    // Optionally save only IDs
    currentCourse.relevantCourses = relevantCourses.map(c => c._id);
    await currentCourse.save();

    res.status(200).json({ message: 'Relevant courses found', relevantCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export default generateRelevantCourses;
