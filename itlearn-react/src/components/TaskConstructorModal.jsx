import { useState } from "react";

function TaskConstructorModal({ isOpen, onClose, onSave, courseId }) {
    const [tasks, setTasks] = useState([
        {
            taskTitle: "",
            taskType: "",
            taskContent: "",
            taskOptions: [{ optionText: "", correctness: "incorrect" }],
        },
    ]);

    if (!isOpen) return null;

    const handleTaskChange = (index, field, value) => {
        const updated = [...tasks];
        updated[index][field] = value;
        setTasks(updated);
    };

    // Feature to change answer option in a specific task
    const handleOptionChange = (taskIndex, optionIndex, field, value) => {
        const updated = [...tasks];
        updated[taskIndex].taskOptions[optionIndex][field] = value;
        setTasks(updated);
    };

    // Add answer option
    const addOption = (taskIndex) => {
        const updated = [...tasks];
        updated[taskIndex].taskOptions.push({ optionText: "", correctness: "incorrect" });
        setTasks(updated);
    };

    // Delete answer option
    const removeOption = (taskIndex, optionIndex) => {
        const updated = [...tasks];
        if (updated[taskIndex].taskOptions.length > 1) {
            updated[taskIndex].taskOptions.splice(optionIndex, 1);
            setTasks(updated);
        }
    };

    const addTask = () => {
        setTasks([
            ...tasks,
            {
                taskTitle: "",
                taskType: "",
                taskContent: "",
                taskOptions: [{ optionText: "", correctness: "incorrect" }],
            },
        ]);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const filtered = tasks.filter((t) => t.taskTitle.trim() !== "");
        if (filtered.length === 0) {
            alert("Please add at least one task with a title.");
            return;
        }

        try {
            const savedTasks = [];
            for (const task of filtered) {
                // Before sending, convert taskOptions to a JSON string (if necessary)
                const taskToSend = {
                    ...task,
                    taskOptions: task.taskOptions,
                };

                const resp = await fetch(
                    `http://localhost:8080/api/courses/${courseId}/tasks`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(taskToSend),
                    }
                );
                if (!resp.ok) throw new Error("Error adding task");
                savedTasks.push(await resp.json());
            }
            onSave(savedTasks);
            onClose();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog" style={{ maxWidth: "1000px" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Tasks</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="mb-4 border-bottom pb-3">
                                <h6>Task {taskIndex + 1}</h6>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Task Title"
                                    value={task.taskTitle}
                                    onChange={(e) =>
                                        handleTaskChange(taskIndex, "taskTitle", e.target.value)
                                    }
                                />
                                <select
                                    className="form-select mb-2"
                                    value={task.taskType}
                                    onChange={(e) =>
                                        handleTaskChange(taskIndex, "taskType", e.target.value)
                                    }
                                >
                                    <option value="">-- Select Type --</option>
                                    <option value="multiple-choice">Multiple Choice</option>
                                    <option value="open-ended">Open Ended</option>
                                    <option value="true-false">True / False</option>
                                </select>
                                <textarea
                                    className="form-control mb-2"
                                    rows={3}
                                    placeholder="Task Content"
                                    value={task.taskContent}
                                    onChange={(e) =>
                                        handleTaskChange(taskIndex, "taskContent", e.target.value)
                                    }
                                />

                                {/* Variant constructor */}
                                <div>
                                    <label>Task Options:</label>
                                    {task.taskOptions.map((option, optionIndex) => (
                                        <div
                                            key={optionIndex}
                                            className="d-flex align-items-center mb-2 gap-2"
                                        >
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Option text"
                                                value={option.optionText}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        taskIndex,
                                                        optionIndex,
                                                        "optionText",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <select
                                                className="form-select"
                                                style={{ maxWidth: "150px" }}
                                                value={option.correctness}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        taskIndex,
                                                        optionIndex,
                                                        "correctness",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="correct">Correct</option>
                                                <option value="incorrect">Incorrect</option>
                                                <option value="partial">Partial Correct</option>
                                            </select>
                                            {task.taskOptions.length > 1 && (
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => removeOption(taskIndex, optionIndex)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        className="btn btn-outline-primary btn-sm mt-2"
                                        onClick={() => addOption(taskIndex)}
                                    >
                                        + Add Option
                                    </button>
                                </div>

                                {tasks.length > 1 && (
                                    <button
                                        className="btn btn-outline-danger btn-sm mt-3"
                                        onClick={() => removeTask(taskIndex)}
                                    >
                                        Remove Task
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="btn btn-outline-primary" onClick={addTask}>
                            + Add Another Task
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

export default TaskConstructorModal;
