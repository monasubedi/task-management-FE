import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AUTH_API from "../utils/api";

export interface TaskData {
  id?: number;
  task: string;
  priority: string;
  isCompleted: boolean;
}

const useTask = () => {
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<string>("");

  const navigate = useNavigate();

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleIsCompletedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsCompleted(e.target.value);
  };

  const createTask = async (taskData: TaskData) => {
    const { data } = await AUTH_API.post(
      `${process.env.REACT_APP_API_URL}/tasks` as string,
      taskData
    );
    return data;
  };
  const updateTask = async (taskData: TaskData) => {
    const { data } = await AUTH_API.put(
      `${process.env.REACT_APP_API_URL}/tasks/${taskData.id}` as string,
      taskData
    );
    return data;
  };

  const getAllTasks = async () => {
    const { data } = await AUTH_API.get(
      `${process.env.REACT_APP_API_URL}/tasks` as string
    );
    return data;
  };

  const deleteTask = async (id: number) => {
    alert("Are you sure to delete this task.");
    await AUTH_API.delete(
      `${process.env.REACT_APP_API_URL}/tasks/${id}` as string
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const onSuccess = (text: string) => {
    toast.success(text);
    handleNavigation("/task-list");
  };

  const onError = () => {
    toast.error("Something went wrong!");
  };

  const createTaskMutation = useMutation({
    mutationKey: ["create-task"],
    mutationFn: (taskData: TaskData) => createTask(taskData),
    onSuccess: () => onSuccess("Successfully created a task."),
    onError,
  });

  const getTasksQuery = useQuery({
    queryKey: ["get-tasks"],
    queryFn: () => getAllTasks(),
  });

  const updateTaskMutation = useMutation({
    mutationKey: ["update-task"],
    mutationFn: (taskData: TaskData) => updateTask(taskData),
    onSuccess: () => onSuccess("Successfully updated a task."),
    onError,
  });

  const deleteTaskMutation = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: (id: string) => deleteTask(Number(id)),
    onSuccess: () => {
      onSuccess("Successfully deleted a task.");
      getAllTasks();
    },
    onError,
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: TaskData = {
      task,
      priority,
      isCompleted: isCompleted === "NO" ? false : true,
    };
    createTaskMutation.mutate(taskData);
    setTask("");
    setPriority("");
    setIsCompleted("");
  };
  const handleUpdateTask = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const taskData: TaskData = {
      id,
      task,
      priority,
      isCompleted: isCompleted === "NO" ? false : true,
    };
    updateTaskMutation.mutate(taskData);
    setTask("");
    setPriority("");
    setIsCompleted("");
  };

  return {
    task,
    priority,
    isCompleted,
    createTaskMutation,
    deleteTaskMutation,
    updateTaskMutation,
    getTasksQuery,
    handleTaskChange,
    handlePriorityChange,
    handleIsCompletedChange,
    handleCreateTask,
    handleUpdateTask,
    handleNavigation,
    setTask,
    setPriority,
    setIsCompleted,
  };
};

export default useTask;
