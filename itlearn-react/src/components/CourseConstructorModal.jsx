import { useState } from "react";

function CourseConstructorModal({ show, onClose, onCreate }) {
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseDescription: "",
    courseLevel: "",
    courseCategory: "",
    courseImageFile: null,
  });

  const handleCreate = () => {
    if (!newCourse.courseName.trim()) {
      alert("Course name is required");
      return;
    }

    const formData = new FormData();
    formData.append("courseName", newCourse.courseName);
    formData.append("courseDescription", newCourse.courseDescription);
    formData.append("courseLevel", newCourse.courseLevel);
    formData.append("courseCategory", newCourse.courseCategory);
    if (newCourse.courseImageFile) {
      formData.append("file", newCourse.courseImageFile);
    }

    fetch("http://localhost:8080/api/courses", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        onCreate(data);
        setNewCourse({
          courseName: "",
          courseDescription: "",
          courseLevel: "",
          courseCategory: "",
          courseImageFile: null,
        });
        onClose();
      })
      .catch(err => {
        console.error(err);
        alert("Error creating course");
      });
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Course</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Course Name *</label>
              <input
                type="text"
                className="form-control"
                value={newCourse.courseName}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="2"
                value={newCourse.courseDescription}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseDescription: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Level</label>
              <select
                className="form-control"
                value={newCourse.courseLevel}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseLevel: e.target.value })}>

                  <option value="">--Please choose an option--</option>
                  <option value="beginner">Beginner</option>
                  <option value="middle">Middle</option>
                  <option value="hard">Hard</option>
                  <option value="intermediate">Intermediate</option>
              </select>

            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={newCourse.courseCategory}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseCategory: e.target.value })}>

                    <option value="">--Please choose an option--</option>
                    <option value="programming-languages">Programming Languages</option>
                    <option value="data-structures">Data Structures</option>
                    <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Course Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setNewCourse({ ...newCourse, courseImageFile: e.target.files[0] })
                }
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCreate}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseConstructorModal;
