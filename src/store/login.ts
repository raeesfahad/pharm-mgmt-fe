
import { writable, type Writable } from "svelte/store";

let token = sessionStorage.getItem('token')

export let loggedIn : Writable<boolean> = writable(!!token);

export let LoginError: Writable<boolean> = writable(false);

/**
 * Sends a POST request to the login API endpoint with the provided username and password.
 *
 * @param {string} username - The username to login with.
 * @param {string} password - The password to login with.
 */
export function LoginUser(username: string, password: string): void {
  const loginData = {
    username,
    password,
  };

  fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(loginData).toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const token = data.access_token;
      sessionStorage.setItem("token", JSON.stringify(token));
      loggedIn.set(true)
    })
    .catch((error) => {
      LoginError.set(true);
      console.log(error.message)
      // Handle login failure, e.g., display error message
    });
}
export function LogOut():void{ 
  loggedIn.set(false);
  window.location.href = "/#/login"
  sessionStorage.removeItem('token');
}