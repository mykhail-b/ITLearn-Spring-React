package com.itlearn.backend.repositories;

import com.itlearn.backend.models.LectureTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureTaskRepository extends JpaRepository<LectureTask,Integer> {
}
