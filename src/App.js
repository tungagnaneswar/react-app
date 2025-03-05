import React, { useState } from "react";
import "./App.css";

const initialTasks = [
  { id: "1", title: "Learn React", status: "todo" },
  { id: "2", title: "Build a project", status: "in-progress" },
  { id: "3", title: "Deploy to production", status: "done" },
];

const statuses = [
  { key: "todo", label: "📝 To Do" },
  { key: "in-progress", label: "🚧 In Progress" },
  { key: "done", label: "✅ Done" },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const onDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const allowDrop = (e) => e.preventDefault();

  return (
    <div className="kanban-wrapper">
      <h1 className="kanban-title">KANBAN BOARD</h1>
      <div className="kanban-container">
        {statuses.map(({ key, label }) => (
          <div
            key={key}
            className="kanban-column"
            onDragOver={allowDrop}
            onDrop={(e) => onDrop(e, key)}
          >
            <h2>{label}</h2>
            <div className="task-list">
              {tasks
                .filter((task) => task.status === key)
                .map((task) => (
                  <div
                    key={task.id}
                    className="task"
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                  >
                    {task.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
