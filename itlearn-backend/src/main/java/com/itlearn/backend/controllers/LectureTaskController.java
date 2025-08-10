package com.itlearn.backend.controllers;

import com.itlearn.backend.models.LectureTask;
import com.itlearn.backend.services.LectureTaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class LectureTaskController {
    private final LectureTaskService lectureTaskService;

    public LectureTaskController(LectureTaskService lectureTaskService) {
        this.lectureTaskService = lectureTaskService;
    }

    @GetMapping
    public List<LectureTask> getAllTasks() {
        return lectureTaskService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LectureTask> getTaskById(@PathVariable Integer id) {
        Optional<LectureTask> task = lectureTaskService.findById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LectureTask> createTask(@RequestBody LectureTask task) throws URISyntaxException {
        LectureTask savedTask = lectureTaskService.save(task);
        return ResponseEntity.created(new URI("/api/tasks/" + savedTask.getId())).body(savedTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LectureTask> updateTask(@PathVariable Integer id, @RequestBody LectureTask task) {
        try {
            LectureTask updatedTask = lectureTaskService.update(id, task);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        lectureTaskService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
