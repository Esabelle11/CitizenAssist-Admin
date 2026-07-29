import { useEffect, useState } from "react";

import {
  getSessions,
  getMessages,
} from "./service";

import {
  ChatSession,
  ChatMessage,
} from "@/types";

export function useHooks() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [selectedChat, setSelectedChat] = useState("");

  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);

  async function refreshSessions() {
    setLoading(true);

    const data = await getSessions();

    setSessions(data);

    if (data.length > 0 && !selectedChat) {
      setSelectedChat(data[0].id);
    }

    setLoading(false);
  }

  async function loadMessages(chatId: string) {
    setMessageLoading(true);

    const data = await getMessages(chatId);

    setMessages(data);

    setMessageLoading(false);
  }

  function selectChat(chatId: string) {
    setSelectedChat(chatId);
  }

  useEffect(() => {
    refreshSessions();
  }, []);

  useEffect(() => {
    if (!selectedChat) return;

    loadMessages(selectedChat);
  }, [selectedChat]);

  return {
    sessions,
    messages,

    selectedChat,
    selectChat,

    loading,
    messageLoading,

    refreshSessions,
  };
}