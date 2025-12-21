import { db } from "../index.js";

export const getMessagesFromPrivateConversations = async (conversation_id) => {
  const messages = await db.query(
    "SELECT m.id, m.sender_id, u.username, m.type, m.text, m.created_at FROM messages m INNER JOIN users u ON m.sender_id = u.id WHERE m.conversation_id = $1 ORDER BY created_at DESC LIMIT 50;",
    [conversation_id]
  );
  return messages;
};

export const createMessage = async (conversation_id, sender_id, type, text) => {
  try {
    if ((!conversation_id, !sender_id || !type || !text)) {
      throw new Error("Something went wrong with sending message");
    }

    const message_id = await db.query(
      "INSERT INTO messages (conversation_id, sender_id, type, text) VALUES ($1, $2, $3, $4) RETURNING id",
      [conversation_id, sender_id, type, text]
    );

    return text;
  } catch (error) {}
};
