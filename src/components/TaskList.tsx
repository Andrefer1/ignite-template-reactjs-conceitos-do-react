import { useState } from "react";
import { FiTrash, FiCheckSquare } from "react-icons/fi";

import "../styles/tasklist.scss";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [counter, setCounter] = useState(1);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) {
      return;
    }

    setCounter(counter + 1);

    const newTask = {
      id: counter,
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);

    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const findTask = tasks.find((task) => task.id == id);

    if (!findTask) {
      return;
    }

    findTask.isComplete == false
      ? (findTask.isComplete = true)
      : (findTask.isComplete = false);

    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const indexTask = tasks.findIndex((task) => task.id == id);

    if (indexTask == -1) {
      return;
    }

    tasks.splice(indexTask, 1);

    setTasks([...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
