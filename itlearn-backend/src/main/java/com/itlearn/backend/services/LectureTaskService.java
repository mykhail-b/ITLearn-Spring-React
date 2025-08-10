package com.itlearn.backend.services;

import com.itlearn.backend.models.LectureTask;
import com.itlearn.backend.repositories.LectureTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LectureTaskService {
    @Autowired
    private LectureTaskRepository lectureTaskRepository;

    public LectureTask save(LectureTask task) {
        return lectureTaskRepository.save(task);
    }

    public LectureTask update(Integer id, LectureTask updatedTask) {
        return lectureTaskRepository.findById(id)
                .map(existingTask -> {
                    existingTask.setTaskTitle(updatedTask.getTaskTitle());
                    existingTask.setTaskContent(updatedTask.getTaskContent());
                    existingTask.setTaskType(updatedTask.getTaskType());
                    existingTask.setTaskOptions(updatedTask.getTaskOptions());

                    return lectureTaskRepository.save(existingTask);
                })
                .orElseThrow(() -> new RuntimeException("Task for lecture not found with id " + id));
    }

    public Optional<LectureTask> findById(Integer id) {
        return lectureTaskRepository.findById(id);
    }

    public List<LectureTask> findAll() {
        return lectureTaskRepository.findAll();
    }

    public void deleteById(Integer id) {
        lectureTaskRepository.deleteById(id);
    }
}
