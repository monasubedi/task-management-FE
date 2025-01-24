import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AUTH_API from "../utils/api";

interface UserData {
  userId: number;
  username: string;
  email: string;
}

const useUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const updateUser = async (userData: UserData) => {
    const { data } = await AUTH_API.put(
      `${process.env.REACT_APP_API_URL}/users/${userData.userId}` as string,
      userData
    );
    return data;
  };

  const getUser = async () => {
    const { data } = await AUTH_API.get(
      `${process.env.REACT_APP_API_URL}/users` as string
    );
    return data;
  };

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (userData: UserData) => updateUser(userData),
    onSuccess: () => toast.success("Successfully updated the user."),
    onError: () => toast.error("Something went wrong."),
  });

  const getUserQuery = useQuery({
    queryKey: ["get-user"],
    queryFn: () => getUser(),
  });

  const handleUserUpdate = (e: React.FormEvent, userId: number) => {
    e.preventDefault();
    const userData: UserData = {
      userId,
      username,
      email,
    };
    updateUserMutation.mutate(userData);
  };

  return {
    handleUserUpdate,
    setUsername,
    setEmail,
    username,
    email,
    getUserQuery,
  };
};

export default useUser;
