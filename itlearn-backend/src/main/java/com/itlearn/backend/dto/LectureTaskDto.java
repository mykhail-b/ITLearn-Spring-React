package com.itlearn.backend.dto;

import com.fasterxml.jackson.databind.JsonNode;

public class LectureTaskDto {
    private Integer id;
    private String taskTitle;
    private String taskType;
    private JsonNode taskOptions;
    private String taskContent;

    // Constructors
    public LectureTaskDto() {}

    public LectureTaskDto(Integer id, String taskTitle, String taskType, String taskContent, JsonNode taskOptions) {
        this.id = id;
        this.taskTitle = taskTitle;
        this.taskType = taskType;
        this.taskContent = taskContent;
        this.taskOptions = taskOptions;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTaskTitle() {
        return taskTitle;
    }
    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }
    public String getTaskType() {
        return taskType;
    }
    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }
    public String getTaskContent() {
        return taskContent;
    }
    public void setTaskContent(String taskContent) {
        this.taskContent = taskContent;
    }
    public JsonNode getTaskOptions() {
        return taskOptions;
    }
    public void setTaskOptions(JsonNode taskOptions) {
        this.taskOptions = taskOptions;
    }
}
