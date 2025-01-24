import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

export interface FormData {
  username?: string;
  email: string;
  password: string;
  role?: string;
}

export interface ApiResponse {
  userId: number;
  token: string;
}

const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useAuthContext();

  const navigate = useNavigate();

  const signUp = async (formData: FormData): Promise<ApiResponse> => {
    const res: AxiosResponse<ApiResponse> = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register` as string,
      formData
    );
    return res.data;
  };

  const signIn = async (formData: FormData): Promise<ApiResponse> => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login` as string,
      formData
    );
    return data;
  };

  const logout = () => {
    localStorage.clear();
    auth?.setIsAuthenticated(!auth.isAuthenticated);
    handleNavigation("/login");
  };
  const onSuccess = (data: ApiResponse, text: string) => {
    toast.success(text);
    handleNavigation("/");
    localStorage.setItem("userData", JSON.stringify(data));
    auth?.setIsAuthenticated(!auth.isAuthenticated);
  };

  const onError = () => {
    toast.error("Something went wrong!");
  };
  const signUpMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (formData: FormData) => signUp(formData),
    onSuccess: (data) => onSuccess(data, "Successfully created a user."),
    onError,
  });
  const signInMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (formData: FormData) => signIn(formData),
    onSuccess: (data) => onSuccess(data, "Successfully logged In."),
    onError,
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user: FormData = {
      username,
      email,
      password,
      role: "USER",
    };
    signUpMutation.mutate(user);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSignInUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user: FormData = {
      email,
      password,
    };
    signInMutation.mutate(user);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return {
    handleCreateUser,
    handleNavigation,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSignInUser,
    logout,
    username,
    password,
    email,
    signUpMutation,
    signInMutation,
  };
};

export default useAuth;
