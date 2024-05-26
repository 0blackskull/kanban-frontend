import { useContext, useRef } from "react";
import { UserContext } from "../App";
import owl from "../assets/owl.jpeg";

import "../stylesheets/Login.css";

const BASE = "http://localhost:3000/auth";

const requestLogin = async (
  user: string | null = "",
  pwd: string | null = "werxrd"
) => {
  try {
    const response = await fetch(`${BASE}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: "Utk", pwd: "utk@CR330" }),
      credentials: "include",
    });

    const data = await response.json();

    console.log(`Login response: ${JSON.stringify(response.headers)}`);

    if (data.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(`Login attempt failed: ${err}`);
  }
};

const requestSignup = async (
  user: string | null = "",
  pwd: string | null = ""
) => {
  try {
    const response = await fetch(`${BASE}/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user, pwd }),
      credentials: "include",
    });

    const data = await response.json();

    console.log(`Signup response: ${data}`);
  } catch (err) {
    console.error(`Signup attempt failed: ${err}`);
  }
};

export default function Login() {
  const userContext = useContext(UserContext);

  const user = useRef<HTMLInputElement>(null);
  const pwd = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const allowLogin = await requestLogin(
      user.current?.value,
      pwd.current?.value
    );

    if (allowLogin) {
      userContext?.setUser(user.current?.value);
    }
  };

  const handleSignup = (e: any) => {
    e.preventDefault();

    requestSignup(user.current?.value, pwd.current?.value);

    userContext?.setUser(user.current?.value);
  };

  return (
    <div id="login">
      <img id="owl" src={owl} alt="A wise owl" />

      <form id="loginForm" method="post">
        <input ref={user} placeholder="Username" />
        <input ref={pwd} type="password" placeholder="Password" />
        <div id="form-buttons-wrapper">
          <button onClick={handleLogin} type="submit">
            Login
          </button>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      </form>

      <h1 id="login-title">Who are you?</h1>
    </div>
  );
}
