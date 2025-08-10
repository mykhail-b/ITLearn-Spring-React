package com.itlearn.backend.repositories;

import com.itlearn.backend.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course,Long> { }
