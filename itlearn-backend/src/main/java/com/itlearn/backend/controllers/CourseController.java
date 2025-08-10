package com.itlearn.backend.controllers;

import com.itlearn.backend.dto.LectureTaskDto;
import com.itlearn.backend.models.Course;
import com.itlearn.backend.models.Lecture;
import com.itlearn.backend.models.LectureTask;
import com.itlearn.backend.services.CourseService;
import com.itlearn.backend.services.LectureService;
import com.itlearn.backend.services.LectureTaskService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin("http://localhost:5173/")
public class CourseController {

    private final CourseService courseService;
    private final LectureService lectureService;
    private final LectureTaskService taskService;

    public CourseController(CourseService courseService,
                            LectureService lectureService,
                            LectureTaskService taskService) {
        this.courseService = courseService;
        this.lectureService = lectureService;
        this.taskService = taskService;
    }

    @GetMapping
    public List<Course> getCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCourse(
            @ModelAttribute Course course,
            @RequestPart(required = false) MultipartFile file
    ) throws URISyntaxException {
        if (course.getCourseName() == null || course.getCourseName().isEmpty()) {
            return ResponseEntity.badRequest().body("Course name must not be null or empty");
        }
        Course savedCourse = courseService.saveCourse(course);
        return ResponseEntity.created(new URI("/api/courses/" + savedCourse.getId()))
                .body(savedCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        if (course.getCourseName() == null || course.getCourseName().isEmpty()) {
            return ResponseEntity.badRequest().body("Course name must not be null or empty");
        }
        try {
            Course updatedCourse = courseService.updateCourse(id, course);
            return ResponseEntity.ok(updatedCourse);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/{courseId}/lectures")
    public ResponseEntity<Lecture> addLectureToCourse(
            @PathVariable Long courseId,
            @RequestBody Lecture lecture
    ) {
        Course course = courseService.getCourseById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        lecture.setCourse(course);
        Lecture saved = lectureService.save(lecture);
        return ResponseEntity.ok(saved);
    }


    @PostMapping("/{courseId}/tasks")
    public ResponseEntity<LectureTask> addTaskToCourse(
            @PathVariable Long courseId,
            @RequestBody LectureTaskDto taskDto
    ) {
        Course course = courseService.getCourseById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        LectureTask task = new LectureTask();
        task.setCourse(course);
        task.setTaskTitle(taskDto.getTaskTitle());
        task.setTaskType(taskDto.getTaskType());
        task.setTaskContent(taskDto.getTaskContent());
        task.setTaskOptions(taskDto.getTaskOptions());

        LectureTask saved = taskService.save(task);
        return ResponseEntity.ok(saved);
    }
}
