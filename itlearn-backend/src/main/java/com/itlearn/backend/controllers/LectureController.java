package com.itlearn.backend.controllers;

import com.itlearn.backend.models.Lecture;
import com.itlearn.backend.services.LectureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lectures")
public class LectureController {

    private final LectureService lectureService;

    public LectureController(LectureService lectureService) {
        this.lectureService = lectureService;
    }

    @GetMapping
    public List<Lecture> getAllLectures() {
        return lectureService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lecture> getLectureById(@PathVariable Long id) {
        Optional<Lecture> lecture = lectureService.findById(Math.toIntExact(id));
        return lecture.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Lecture> createLecture(@RequestBody Lecture lecture) throws URISyntaxException {
        Lecture savedLecture = lectureService.save(lecture);
        return ResponseEntity.created(new URI("/api/lectures/" + savedLecture.getId())).body(savedLecture);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lecture> updateLecture(@PathVariable Integer id, @RequestBody Lecture lecture) {
        try {
            Lecture updatedLecture = lectureService.update(id, lecture);
            return ResponseEntity.ok(updatedLecture);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLecture(@PathVariable Integer id) {
        lectureService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
