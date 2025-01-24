import TaskCard from "../../components/task/task-card";
import useTask from "../../hooks/useTask";
import "./task.css";

export type TaskItem = {
  id: string;
  task: string;
};

const TaskList = () => {
  const { getTasksQuery } = useTask();
  return (
    <div>
      <h1>Task List</h1>
      <div className="taskCardContainer">
        {getTasksQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          getTasksQuery.data.todoResponseDTOs.map((todo: TaskItem) => (
            <TaskCard todo={todo} key={todo.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
