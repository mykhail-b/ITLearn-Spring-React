package com.itlearn.backend.services;

import com.itlearn.backend.models.Course;
import com.itlearn.backend.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updated) {
        Course existing = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        existing.setCourseName(updated.getCourseName());
        existing.setCourseDescription(updated.getCourseDescription());
        existing.setCourseLevel(updated.getCourseLevel());
        existing.setCourseCategory(updated.getCourseCategory());
        existing.setCourseImagePath(updated.getCourseImagePath());
        return courseRepository.save(existing);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
