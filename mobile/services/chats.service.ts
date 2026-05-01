import { apiMiddleware } from "@/utils/middleware";

// 🔹 Pobierz wszystkie czaty użytkownika
export async function getChatsRequest() {
  const res = await apiMiddleware.get("/conversation/getConversations");
  return res.data;
}

// 🔹 Pobierz jeden chat + wiadomości
export async function getChatByIdRequest(chatId: string) {
  const res = await apiMiddleware.get(`/conversation/${chatId}`);
  return res.data;
}

// 🔹 Wyślij wiadomość
export async function sendMessageRequest(chatId: string, content: string) {
  const res = await apiMiddleware.post(`/conversation/${chatId}/messages`, {
    content,
  });

  return res.data;
}

// 🔹 Stwórz nowy chat (np. 1:1 lub grupowy)
export async function createChatRequest(participants: string[]) {
  const res = await apiMiddleware.post("/conversation", {
    participants,
  });

  return res.data;
}

// 🔹 Oznacz wiadomości jako przeczytane
export async function markAsReadRequest(chatId: string) {
  const res = await apiMiddleware.post(`/conversation/${chatId}/read`);

  return res.data;
}
