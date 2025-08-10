import React, { useState, useEffect } from "react";
import CourseConstructorModal from "../components/CourseConstructorModal.jsx";
import LectureConstructorModal from "../components/LectureConstructorModal.jsx";
import TaskConstructorModal from "../components/TaskConstructorModal.jsx";

function Crud() {
    const [courses, setCourses] = useState([]);
    const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
    const [showCreateLectureModal, setShowCreateLectureModal] = useState(false);
    const [showTaskConstructorModal, setShowTaskConstructorModal] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/courses")
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(console.error);
    }, []);

    const handleCourseCreated = (newCourse) => {
        setCourses(prev => [...prev, newCourse]);
    };

    const handleLecturesAdded = (lectures) => {
        setCourses(prev =>
            prev.map(c =>
                c.id === currentCourseId
                    ? { ...c, lectures: [...(c.lectures || []), ...lectures] }
                    : c
            )
        );
    };

    const handleTasksAdded = (tasks) => {
        setCourses(prev =>
            prev.map(c =>
                c.id === currentCourseId
                    ? { ...c, tasks: [...(c.tasks || []), ...tasks] }
                    : c
            )
        );
    };

    return (
        <div className="container mt-4">
            <h2>Courses Table</h2>
            <button
                className="btn btn-primary mb-3"
                onClick={() => setShowCreateCourseModal(true)}
            >
                <i className="bi bi-plus-circle me-1"></i> Create Course
            </button>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Level</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {courses.map(course => (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseLevel}</td>
                        <td>{course.courseCategory}</td>
                        <td>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => {
                                    setCurrentCourseId(course.id);
                                    setShowCreateLectureModal(true);
                                }}
                            >
                                Add Lecture
                            </button>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => {
                                    setCurrentCourseId(course.id);
                                    setShowTaskConstructorModal(true);
                                }}
                            >
                                Add Task
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <CourseConstructorModal
                show={showCreateCourseModal}
                onClose={() => setShowCreateCourseModal(false)}
                onCreate={handleCourseCreated}
            />

            <LectureConstructorModal
                isOpen={showCreateLectureModal}
                onClose={() => setShowCreateLectureModal(false)}
                courseId={currentCourseId}
                onSave={handleLecturesAdded}
            />

            <TaskConstructorModal
                isOpen={showTaskConstructorModal}
                onClose={() => setShowTaskConstructorModal(false)}
                courseId={currentCourseId}
                onSave={handleTasksAdded}
            />
        </div>
    );
}

export default Crud;
