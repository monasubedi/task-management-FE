import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SubmitButton from "../../components/button/button";
import Input from "../../components/input/input";
import Select from "../../components/select/select";
import useTask from "../../hooks/useTask";
import { PRIORITY_LIST, TASK_STATUS } from "../../utils/constants";
import "./task.css";

const NewTask = () => {
  const {
    handleCreateTask,
    handleUpdateTask,
    handleTaskChange,
    handlePriorityChange,
    handleIsCompletedChange,
    setTask,
    setPriority,
    setIsCompleted,
    task,
    priority,
    isCompleted,
  } = useTask();
  const location = useLocation();
  const todo = location.state;

  useEffect(() => {
    if (todo) {
      setTask(todo.task);
      setPriority(todo.priority);
      setIsCompleted(todo.isCompleted);
    }
  }, [todo, setTask, setPriority, setIsCompleted]);

  return (
    <div className="taskContainer">
      <h1>{todo ? "Update" : "Create"} a task</h1>
      <form
        onSubmit={todo ? (e) => handleUpdateTask(e, todo.id) : handleCreateTask}
        className="formContainer"
      >
        <Input
          type="text"
          label="Task"
          value={task}
          required={true}
          onChange={handleTaskChange}
        />
        <Select
          label="Priority"
          value={priority}
          items={PRIORITY_LIST}
          required={true}
          onChange={handlePriorityChange}
        />
        <Select
          label="Completed"
          value={isCompleted}
          required={true}
          items={TASK_STATUS}
          onChange={handleIsCompletedChange}
        />
        <SubmitButton title={todo ? "UPDATE" : "CREATE"} />
      </form>
    </div>
  );
};

export default NewTask;
