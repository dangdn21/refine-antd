"use client";

import { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";

const mockUsers = [
  {
    email: "admin@herond.dev",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=41",
    roles: ["admin"],
  },
];

export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/admin",
      });
      return {
        success: true,
        redirectTo: "/admin",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  register: async (params) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === params.email);

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/admin",
      });
      return {
        success: true,
        redirectTo: "/admin",
      };
    }
    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async (params) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.email === params.email);

    if (user) {
      //we can send email with reset password link here
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async (params) => {
    // Suppose we actually send a request to the back end here.
    const isPasswordInvalid = params.password === "123456" || !params.password;

    if (isPasswordInvalid) {
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: "Invalid password",
        },
      };
    }

    return {
      success: true,
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/admin" });
    return {
      success: true,
      redirectTo: "/admin/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/admin/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
