import { User } from "@/types/user";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch (err: any) {
    if (err?.name === "AbortError") {
      throw new Error("Request timed out. Please check your connection.");
    }
    throw new Error("Cannot reach the server. Is the backend running on port 5000?");
  } finally {
    clearTimeout(timeout);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
}

export const authService = {
  async login(email: string, password: string) {
    return request<{ success: boolean; token: string; refreshToken: string; user: User }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) }
    );
  },

  async register(fullname: string, email: string, password: string) {
    return request<{ success: boolean; message: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullname, email, password }),
    });
  },

  async getCurrentUser() {
    return request<{ success: boolean; data: User }>("/users/me").then((r) => r.data);
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return request<{ success: boolean; token: string }>("/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  },
};
