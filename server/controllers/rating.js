
export const rating = async (req, res) => {
    const { courseId, rating } = req.body;
    const course = await CourseModel.findById(courseId);
    if (!course) {
        return res.status(400).json({ msg: "Course not found" });
    }
    course.rating.numberOfRatings += 1;
    course.rating.totalRating += Math.min(Math.max(rating, 1), 5); // Limit rating between 1 and 5
    await course.save();
    return res.json({ msg: "Rating added successfully", course: course });
}
