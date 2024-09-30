import { AxiosResponse } from 'axios';
import axiosInstance from '../helpers/axiosInstance';
import LoginCredentials from '../types/login-credentials';
import User from '../types/user';

const baseUrl = '/api/v1/auth';

export const loginService = (
  credentials: LoginCredentials
): Promise<AxiosResponse<{ token: string; user: User }>> => {
  return axiosInstance.post(`${baseUrl}/login`, credentials);
};

export const getMeService = () => {
  return axiosInstance.get(`${baseUrl}/me`);
};
