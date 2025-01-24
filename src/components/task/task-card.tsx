import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useTask from "../../hooks/useTask";
import { TaskItem } from "../../pages/task/task-list";
import "./task.css";

type taskProps = {
  todo: TaskItem;
};

const TaskCard = ({ todo }: taskProps) => {
  const navigate = useNavigate();
  const { deleteTaskMutation } = useTask();
  return (
    <>
      <div className="cardContainer">
        <div className="cardWrapper">
          <h3>#{todo.id}</h3>
          <div className="taskWrapper">
            <p>{todo.task}</p>
            <div className="settings">
              <BiEditAlt
                size={20}
                onClick={() => navigate("/create-task", { state: todo })}
              />
              <BiTrashAlt
                size={20}
                onClick={() => deleteTaskMutation.mutate(todo.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
