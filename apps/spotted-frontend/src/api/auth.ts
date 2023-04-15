import apiClient from './api-client';

export async function signup(email: string, password: string) {
  try {
    const response = await apiClient.post('/auth/signup', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function logout(accessToken: string) {
  try {
    const response = await apiClient.post('/auth/logout', { accessToken });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
