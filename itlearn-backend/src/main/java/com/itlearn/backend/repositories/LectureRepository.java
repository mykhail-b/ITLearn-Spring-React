package com.itlearn.backend.repositories;

import com.itlearn.backend.models.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepository extends JpaRepository<Lecture,Integer> {
}
