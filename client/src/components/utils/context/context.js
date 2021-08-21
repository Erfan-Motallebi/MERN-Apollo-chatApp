import { React, useReducer, createContext } from "react";
import JwtDecode from "jwt-decode";

const authContext = createContext({
  login: () => null,
  logout: () => null,
  user: [],
});

const initialState = {
  user: null,
};

if (localStorage.getItem("JwtToken")) {
  const decodedBearer = JwtDecode(localStorage.getItem("JwtToken"));
  if (decodedBearer.exp * 1000 < Date.now()) {
    localStorage.removeItem("JwtToken");
  } else {
    initialState.user = decodedBearer;
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("JwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("JwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <authContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthProvider, authContext };
