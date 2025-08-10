package com.itlearn.backend.dto;

import java.util.List;

public class LectureDto {
    private Integer id;
    private String lectureTitle;
    private String lectureContent;
    private List<LectureTaskDto> tasks;

    // Constructors
    public LectureDto() {}

    public LectureDto(Integer id, String lectureTitle, String lectureContent, List<LectureTaskDto> tasks) {
        this.id = id;
        this.lectureTitle = lectureTitle;
        this.lectureContent = lectureContent;
        this.tasks = tasks;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getLectureTitle() {
        return lectureTitle;
    }
    public void setLectureTitle(String lectureTitle) {
        this.lectureTitle = lectureTitle;
    }
    public String getLectureContent() {
        return lectureContent;
    }
    public void setLectureContent(String lectureContent) {
        this.lectureContent = lectureContent;
    }
    public List<LectureTaskDto> getTasks() {
        return tasks;
    }
    public void setTasks(List<LectureTaskDto> tasks) {
        this.tasks = tasks;
    }
}
