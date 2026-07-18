import { User } from "@/types/user";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://ai-agent-server-sable.vercel.app/api";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
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

export const jobService = {
  async list(params: {
    search?: string;
    category?: string;
    location?: string;
    type?: string;
    experience?: string;
    sort?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "" && v !== null) qs.set(k, String(v));
    });
    return request<any>(`/jobs?${qs.toString()}`);
  },

  async getById(id: string) {
    return request<any>(`/jobs/${id}`);
  },

  async create(payload: any) {
    return request<any>("/jobs", { method: "POST", body: JSON.stringify(payload) });
  },

  async apply(id: string, payload: any) {
    return request<any>(`/jobs/${id}/apply`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export const blogService = {
  async list() {
    return request<any>("/blogs");
  },
  async getBySlug(slug: string) {
    return request<any>(`/blogs/${slug}`);
  },
};

export const resumeService = {
  async analyze(file: File) {
    const token = getToken();
    const form = new FormData();
    form.append("resume", file);
    const res = await fetch(`${API_URL}/resume/analyze`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Analysis failed");
    return data;
  },

  async list() {
    return request<any>("/resume");
  },

  async getById(id: string) {
    return request<any>(`/resume/${id}`);
  },
};

export const recommendationService = {
  async get(type = "jobs", limit = 5) {
    return request<any>(`/recommendations?type=${type}&limit=${limit}`);
  },
  async saved() {
    return request<any>("/recommendations/saved");
  },
  async save(payload: any) {
    return request<any>("/recommendations/save", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export const interviewService = {
  async questions(payload: any) {
    return request<any>("/interview/questions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async evaluate(payload: any) {
    return request<any>("/interview/evaluate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

export const roadmapService = {
  async generate(payload: any) {
    return request<any>("/roadmap/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async list() {
    return request<any>("/roadmap");
  },
  async getById(id: string) {
    return request<any>(`/roadmap/${id}`);
  },
};

export const chatService = {
  async listConversations() {
    return request<any>("/chat");
  },
  async createConversation(title?: string) {
    return request<any>("/chat", {
      method: "POST",
      body: JSON.stringify({ title: title || "New Conversation" }),
    });
  },
  async getConversation(id: string) {
    return request<any>(`/chat/${id}`);
  },
  async sendMessage(id: string, content: string) {
    return request<any>(`/chat/${id}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
  async deleteConversation(id: string) {
    return request<any>(`/chat/${id}`, { method: "DELETE" });
  },
};

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

export { request };
