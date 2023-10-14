import { API_URL } from "../configs/app.config";
import { showAlert } from "./alertSlice";
import { clearToken, setToken } from "./authSlice";

export interface Credentials {
  email: string;
  password: string;
}

export const login = (credentials: Credentials) => async dispatch => {
  let response;
  try {
    response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  } catch (error) {}

  const data = await response.json();
  if (response.ok) {
    dispatch(
      showAlert({ message: "Successfully logged in!", severity: "success" })
    );
    const token = data.result.accessToken;
    dispatch(setToken(token));
    localStorage.setItem("token", token);
    return;
  }
  dispatch(showAlert({ message: data.error.message, severity: "error" }));
};

export const logout = () => async dispatch => {
  dispatch(clearToken());
  localStorage.setItem("token", "null");
};
