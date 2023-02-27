import axios from "axios";
import {
  CheckOutInput,
  ForgetPasswordInput,
  GenTaskInput,
  LoginInput,
  type RegisterInput,
} from "../schema";
import { env } from "../../env.mjs";
import { type StandardResponse } from "../types/common";
import {
  ActiveSubscription,
  IUser,
  Task,
  TaskResponse,
  UsageResponse,
} from "../types/auth.types";

export const authApi = axios.create({
  baseURL: `${env.NEXT_PUBLIC_BASE_URL}/auth/`,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const taskApi = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
taskApi.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<StandardResponse>("create", user);
  return response.data;
};

export const verifyUserFn = async ({
  userId,
  verificationCode,
}: {
  userId: string;
  verificationCode: string;
}) => {
  const response = await authApi.post<StandardResponse>(
    `verify/${userId}/${verificationCode}`
  );
  return response.data;
};

export const forgetPassFn = async (input: ForgetPasswordInput) => {
  const response = await authApi.post<StandardResponse>(
    "forget-password",
    input
  );
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<StandardResponse>("login", user);
  return response.data;
};

export interface IResetPassword {
  params: {
    userId: string;
    passwordResetCode: string;
  };
  body: {
    password: string;
    passwordConfirm: string;
  };
}

export const resetPassFn = async (data: IResetPassword) => {
  const { params, body } = data;
  const response = await authApi.post<StandardResponse>(
    `reset-password/${params.userId}/${params.passwordResetCode}`,
    body
  );
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.post<StandardResponse>("auth/logout");
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<{ message: string; data: IUser }>("me");
  return response.data;
};

export const genrateTask = async (data: GenTaskInput) => {
  const response = await taskApi.post<TaskResponse>("/task/gen", data);
  return response.data;
};

export const getUsage = async () => {
  const response = await taskApi.get<UsageResponse>("/task/usage");
  return response.data;
};

export const getTasks = async () => {
  const response = await taskApi.get<Task[]>("/task/tasks");
  return response.data;
};

export const checkout = async (body: CheckOutInput) => {
  const response = await taskApi.post<StandardResponse>("/checkout", body);
  return response.data;
};

export const getSubscription = async () => {
  const response = await taskApi.get<ActiveSubscription>("/get-active-sub");
  return response.data;
};

export const cancelSubs = async () => {
  const response = await taskApi.post<StandardResponse>("/cancel-sub");
  return response.data;
};
