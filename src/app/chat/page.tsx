"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { chatService } from "@/services/api";
import { Loader2, Send, MessageCircle, Plus, Trash2, Menu, X } from "lucide-react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = React.useState<any[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  React.useEffect(() => {
    if (isAuthenticated) loadConversations();
  }, [isAuthenticated]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const loadConversations = async () => {
    try {
      const res = await chatService.listConversations();
      setConversations(res.data || []);
      if ((res.data || []).length > 0) {
        openConversation(res.data[0]._id);
      }
    } catch {
      // ignore
    }
  };

  const openConversation = async (id: string) => {
    setActiveId(id);
    setLoading(true);
    try {
      const res = await chatService.getConversation(id);
      const msgs = (res.data.messages || []).map((m: any) => ({
        role: m.role,
        content: m.content,
      }));
      setMessages(msgs);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const newConversation = async () => {
    try {
      const res = await chatService.createConversation("New Conversation");
      const conv = res.data;
      setConversations((c) => [conv, ...c]);
      setActiveId(conv._id);
      setMessages([]);
    } catch {
      // ignore
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await chatService.deleteConversation(id);
      setConversations((c) => c.filter((x) => x._id !== id));
      if (activeId === id) {
        setActiveId(null);
        setMessages([]);
      }
    } catch {
      // ignore
    }
  };

  const send = async () => {
    if (!input.trim() || busy) return;
    const text = input.trim();
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setBusy(true);
    setLoading(true);

    let convId = activeId;
    try {
      if (!convId) {
        const res = await chatService.createConversation(text.slice(0, 40));
        convId = res.data._id;
        setActiveId(convId);
        setConversations((c) => [res.data, ...c]);
      }
      const res = await chatService.sendMessage(convId!, text);
      const assistantContent = res.data.assistant.content;
      setMessages((m) => [...m, { role: "assistant", content: assistantContent }]);
      loadConversations();
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn't respond. " + (err?.message || "") },
      ]);
    } finally {
      setBusy(false);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-[4.5rem] left-3 z-30 bg-white border shadow p-2 rounded-md text-indigo-700"
        aria-label="Toggle chats"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "fixed inset-y-0 left-0 z-40 w-64" : "hidden"
        } md:static md:flex md:w-64 md:z-auto flex-col border-r bg-white`}
      >
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={newConversation}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" /> New Chat
          </button>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-2 p-1 text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {conversations.map((c) => (
            <div
              key={c._id}
              className={`group flex items-center justify-between rounded-md px-3 py-2 cursor-pointer ${
                activeId === c._id ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                openConversation(c._id);
                setSidebarOpen(false);
              }}
            >
              <span className="truncate text-sm">{c.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(c._id);
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <section className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <MessageCircle className="h-12 w-12 mb-3" />
              <p className="font-medium">Ask CareerAI anything</p>
              <p className="text-sm">Resume tips, interview prep, career transitions, and more.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-800 shadow"
                }`}
              >
                <p className="whitespace-pre-wrap break-words text-sm">{m.content}</p>
              </div>
            </div>
          ))}
          {loading && busy && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="border-t bg-white p-4">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={send}
              disabled={busy || !input.trim()}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
