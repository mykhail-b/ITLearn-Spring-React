import { useState } from "react";

function LectureConstructorModal({ isOpen, onClose, onSave, courseId }) {
    const [lectures, setLectures] = useState([{ title: "", description: "" }]);

    if (!isOpen) return null;

    const handleLectureChange = (index, field, value) => {
        const updated = [...lectures];
        updated[index][field] = value;
        setLectures(updated);
    };

    const addLecture = () => {
        setLectures([...lectures, { title: "", description: "" }]);
    };

    const removeLecture = (index) => {
        setLectures(lectures.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const filtered = lectures.filter(l => l.title.trim() !== "");
        if (filtered.length === 0) {
            alert("Please add at least one lecture with a title.");
            return;
        }

        try {
            const savedLectures = [];
            for (const lecture of filtered) {
                const resp = await fetch(`http://localhost:8080/api/courses/${courseId}/lectures`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lectureTitle: lecture.title,
                        lectureContent: lecture.description
                    }),
                });
                if (!resp.ok) throw new Error("Error adding lecture");
                savedLectures.push(await resp.json());
            }
            onSave(savedLectures);
            onClose();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog" style={{ maxWidth: "1000px" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Lectures</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {lectures.map((lecture, index) => (
                            <div key={index} className="mb-4 border-bottom pb-3">
                                <h6>Lecture {index + 1}</h6>
                                <input
                                    type="text"
                                    placeholder="Lecture Title"
                                    className="form-control mb-2"
                                    value={lecture.title}
                                    onChange={(e) =>
                                        handleLectureChange(index, "title", e.target.value)
                                    }
                                />
                                <textarea
                                    placeholder="Lecture Description"
                                    className="form-control mb-2"
                                    rows={4}
                                    value={lecture.description}
                                    onChange={(e) =>
                                        handleLectureChange(index, "description", e.target.value)
                                    }
                                />
                                {lectures.length > 1 && (
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => removeLecture(index)}
                                    >
                                        Remove Lecture
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="btn btn-outline-primary" onClick={addLecture}>
                            + Add Another Lecture
                        </button>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Save All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LectureConstructorModal;
