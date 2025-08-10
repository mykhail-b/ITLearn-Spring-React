package com.itlearn.backend.services;

import com.itlearn.backend.models.Lecture;
import com.itlearn.backend.repositories.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LectureService {

    @Autowired
    private LectureRepository lectureRepository;

    public Lecture save(Lecture lecture) {
        return lectureRepository.save(lecture);
    }

    public Lecture update(Integer id, Lecture updatedLecture) {
        return lectureRepository.findById(id)
                .map(existingLecture -> {
                    existingLecture.setLectureTitle(updatedLecture.getLectureTitle());
                    existingLecture.setLectureContent(updatedLecture.getLectureContent());
                    existingLecture.setTasks(updatedLecture.getTasks());
                    existingLecture.setCourse(updatedLecture.getCourse());

                    return lectureRepository.save(existingLecture);
                })
                .orElseThrow(() -> new RuntimeException("Lecture not found with id " + id));
    }


    public Optional<Lecture> findById(Integer id) {
        return lectureRepository.findById(id);
    }

    public List<Lecture> findAll() {
        return lectureRepository.findAll();
    }

    public void deleteById(Integer id) {
        lectureRepository.deleteById(id);
    }
}
